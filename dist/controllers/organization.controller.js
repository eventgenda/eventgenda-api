"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const organization_repository_1 = __importDefault(require("../repositories/organization.repository"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const organizationController = {
    getOrganizations: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const organizations = yield organization_repository_1.default.getAll();
            return (0, response_utils_1.successResponseStatus)(response, 'Get all organizations successfully.', organizations);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getOrganization: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const organization = yield organization_repository_1.default.getById(request.params.id);
            if (!organization)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Organization not found', null);
            return (0, response_utils_1.successResponseStatus)(response, 'Get organization by id successfully.', organization);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getOrganizationByUser: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = request.params.userId;
            const user = yield user_repository_1.default.findById(userId);
            if (!user)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'User not found', null);
            const organization = yield organization_repository_1.default.getById(user.organization._id);
            if (!organization)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Organization not found', null);
            return (0, response_utils_1.successResponseStatus)(response, 'Get organizations by user successfully.', organization);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createOrganization: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const user = yield user_repository_1.default.findById((_a = request.user) === null || _a === void 0 ? void 0 : _a._id);
            if (!user)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'User not found', null);
            if (user.organization)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User already has an organization', null);
            const organization = yield organization_repository_1.default.create(request.body);
            if (!organization)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Create organization failed', null);
            user.organization = organization._id;
            yield user.save();
            return (0, response_utils_1.successResponseStatus)(response, 'Create organization successfully.', organization);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateOrganization: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = request.params.userId;
            const user = yield user_repository_1.default.findById(userId);
            if (!user)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'User not found', null);
            const organization = yield organization_repository_1.default.update(user.organization._id, request.body);
            return (0, response_utils_1.successResponseStatus)(response, 'Update organization successfully.', organization);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteOrganization: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = request.params.userId;
            const user = yield user_repository_1.default.findById(userId);
            if (!user)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'User not found', null);
            if (!user.organization)
                return (0, response_utils_1.errorResponseStatus)(404, response, 'User does not have an organization', null);
            yield organization_repository_1.default.delete(user.organization._id);
            // Update user with organization ID and save
            user.organization = null;
            yield user.save();
            return (0, response_utils_1.successResponseStatus)(response, 'Delete organization successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = organizationController;

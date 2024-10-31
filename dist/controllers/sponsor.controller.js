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
const sponsor_repository_1 = __importDefault(require("../repositories/sponsor.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const sponsorController = {
    getSponsors: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sponsors = yield sponsor_repository_1.default.getAllSponsors();
            return (0, response_utils_1.successResponseStatus)(response, 'Get all sponsors successfully.', sponsors);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getSponsor: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sponsor = yield sponsor_repository_1.default.getSponsorById(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get sponsor by id successfully.', sponsor);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getSponsorByUser: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sponsors = yield sponsor_repository_1.default.getSponsorsByUserId(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get sponsor by user successfully.', sponsors);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getSponsorByEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sponsors = yield sponsor_repository_1.default.getSponsorsByEventId(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get sponsor by event successfully.', sponsors);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createSponsor: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const sponsor = yield sponsor_repository_1.default.createSponsor(Object.assign({ user: userId }, request.body));
            if (!sponsor) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Create sponsor failed.', null);
            }
            return (0, response_utils_1.successResponseStatus)(response, 'Create sponsor successfully.', sponsor);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateSponsor: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const sponsor = yield sponsor_repository_1.default.updateSponsor(request.params.id, Object.assign({ user: userId }, request.body));
            return (0, response_utils_1.successResponseStatus)(response, 'Update sponsor successfully.', sponsor);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteSponsor: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield sponsor_repository_1.default.deleteSponsor(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete sponsor successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = sponsorController;

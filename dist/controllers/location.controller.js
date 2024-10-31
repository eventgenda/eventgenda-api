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
const location_repository_1 = __importDefault(require("../repositories/location.repository"));
const locationController = {
    getLocations: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locations = yield location_repository_1.default.getAll();
            return (0, response_utils_1.successResponseStatus)(response, 'Get all locations successfully.', locations);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getLocation: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const location = yield location_repository_1.default.getById(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get location by id successfully.', location);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getLocationByName: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const location = yield location_repository_1.default.getByName(request.params.name);
            return (0, response_utils_1.successResponseStatus)(response, 'Get location by name successfully.', location);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createLocation: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, location, prices, thumbnail } = request.body;
            const newLocation = yield location_repository_1.default.create({
                name,
                location,
                prices,
                thumbnail,
            });
            if (!newLocation)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Create location failed.', null);
            return (0, response_utils_1.successResponseStatus)(response, 'Create location successfully.', newLocation);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateLocation: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, location, prices, thumbnail } = request.body;
            const locationExist = yield location_repository_1.default.getById(request.params.id);
            if (!locationExist)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Location not found.', null);
            const updateLocation = yield location_repository_1.default.update(request.params.id, {
                name,
                location,
                prices,
                thumbnail,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'Update location successfully.', updateLocation);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteLocation: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield location_repository_1.default.delete(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete location successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = locationController;

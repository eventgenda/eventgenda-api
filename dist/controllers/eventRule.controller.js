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
const eventRule_repository_1 = __importDefault(require("../repositories/eventRule.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const convertToDto = (doc) => ({
    _id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});
const eventRuleController = {
    getAllEventRules: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventRules = yield eventRule_repository_1.default.getAllEventRules();
            const eventRulesDto = eventRules.map(convertToDto);
            return (0, response_utils_1.successResponseStatus)(response, 'Get all event rules successfully.', eventRulesDto);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getEventRule: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventRule = yield eventRule_repository_1.default.getEventRuleById(request.params.id);
            if (!eventRule) {
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Event rule not found.', null);
            }
            const eventRuleDto = convertToDto(eventRule);
            return (0, response_utils_1.successResponseStatus)(response, 'Get event rule by id successfully.', eventRuleDto);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createEventRule: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description } = request.body;
            if (!name || !description) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all the fields.', null);
            }
            const eventRuleExist = yield eventRule_repository_1.default.getEventRuleByName(name);
            if (eventRuleExist) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event rule already exists.', null);
            }
            const newEventRule = yield eventRule_repository_1.default.createEventRule({
                name,
                description,
            });
            const newEventRuleDto = convertToDto(newEventRule);
            return (0, response_utils_1.successResponseStatus)(response, 'Create event rule successfully.', newEventRuleDto);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateEventRule: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description } = request.body;
            if (!name || !description) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all the fields.', null);
            }
            const eventRuleExist = yield eventRule_repository_1.default.getEventRuleById(request.params.id);
            if (!eventRuleExist) {
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Event rule not found.', null);
            }
            const updatedEventRule = yield eventRule_repository_1.default.updateEventRule(request.params.id, { name, description });
            const updatedEventRuleDto = convertToDto(updatedEventRule);
            return (0, response_utils_1.successResponseStatus)(response, 'Update event rule successfully.', updatedEventRuleDto);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteEventRule: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventRuleExist = yield eventRule_repository_1.default.getEventRuleById(request.params.id);
            if (!eventRuleExist) {
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Event rule not found.', null);
            }
            yield eventRule_repository_1.default.deleteEventRule(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete event rule successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = eventRuleController;

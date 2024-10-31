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
const history_repository_1 = __importDefault(require("../repositories/history.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const historyController = {
    getHistories: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const histories = yield history_repository_1.default.getAllHistories();
            return (0, response_utils_1.successResponseStatus)(response, 'Get all History successfully.', histories);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getHistory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const history = yield history_repository_1.default.getHistoryById(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get history by id successfully', history);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getHistoryByUser: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const history = yield history_repository_1.default.getHistoryByUser(request.params.user);
            return (0, response_utils_1.successResponseStatus)(response, 'Get history by user successfully', history);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createHistory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { event, user, action } = request.body;
            if (!event || !user) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all field', null);
            }
            const newHistory = yield history_repository_1.default.createHistory({
                event,
                user,
                action,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'Create history successfully', newHistory);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateHistory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { event, user, action } = request.body;
            const historyExist = yield history_repository_1.default.getHistoryById(request.params.id);
            if (!historyExist) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'History not found.', null);
            }
            if (!event || !user) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all field.', null);
            }
            const updateHistory = yield history_repository_1.default.updateHistory(request.params.id, {
                event,
                user,
                action,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'Update history successfully.', updateHistory);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteHistory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield history_repository_1.default.deleteHistory(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete history successfully', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = historyController;

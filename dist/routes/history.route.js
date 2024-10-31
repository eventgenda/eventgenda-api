"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const history_controller_1 = __importDefault(require("../controllers/history.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const historyRouter = express_1.default.Router();
historyRouter.get('/', history_controller_1.default.getHistories);
historyRouter.get('/:id', history_controller_1.default.getHistory);
historyRouter.get('/user/:user', history_controller_1.default.getHistoryByUser);
historyRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), history_controller_1.default.createHistory);
historyRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), history_controller_1.default.updateHistory);
historyRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), history_controller_1.default.deleteHistory);
exports.default = historyRouter;

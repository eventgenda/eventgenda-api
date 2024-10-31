"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const userRouter = express_1.default.Router();
userRouter.post('/register', user_controller_1.default.register);
userRouter.post('/login', user_controller_1.default.login);
userRouter.post('/refresh-token', user_controller_1.default.refreshToken);
userRouter.get('/profile', auth_middleware_1.default, (0, role_middleware_1.default)('user', 'organizer', 'admin'), user_controller_1.default.getUserProfile);
userRouter.put('/profile', auth_middleware_1.default, (0, role_middleware_1.default)('user', 'organizer', 'admin'), user_controller_1.default.updateUserProfile);
exports.default = userRouter;

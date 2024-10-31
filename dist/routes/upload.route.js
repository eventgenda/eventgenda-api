"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = __importDefault(require("../controllers/upload.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const uploadRouter = express_1.default.Router();
uploadRouter.post('/upload', auth_middleware_1.default, (0, role_middleware_1.default)("user", "organizer", "admin"), upload_controller_1.default.uploadImage);
uploadRouter.post('/destroy', auth_middleware_1.default, (0, role_middleware_1.default)("user", "organizer", "admin"), upload_controller_1.default.deleteImage);
exports.default = uploadRouter;

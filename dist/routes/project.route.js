"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../controllers/project.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const projectRouter = (0, express_1.Router)();
projectRouter.post('/:eventId/create', auth_middleware_1.default, (0, role_middleware_1.default)("user"), project_controller_1.default.createProject);
projectRouter.get('/', project_controller_1.default.getAllProjects);
projectRouter.get('/:id', project_controller_1.default.getProjectById);
projectRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("user"), project_controller_1.default.updateProject);
projectRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("user"), project_controller_1.default.deleteProject);
exports.default = projectRouter;

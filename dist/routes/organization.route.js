"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organization_controller_1 = __importDefault(require("../controllers/organization.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const organizationRouter = express_1.default.Router();
organizationRouter.get('/', organization_controller_1.default.getOrganizations);
organizationRouter.get('/:id', organization_controller_1.default.getOrganization);
organizationRouter.get('/user/:userId', organization_controller_1.default.getOrganizationByUser);
organizationRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("organizer"), organization_controller_1.default.createOrganization);
organizationRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("organizer", "admin"), organization_controller_1.default.updateOrganization);
organizationRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("organizer", "admin"), organization_controller_1.default.deleteOrganization);
exports.default = organizationRouter;

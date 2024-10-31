"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const categoryRouter = express_1.default.Router();
categoryRouter.get('/', category_controller_1.default.getCategories);
categoryRouter.get('/:id', category_controller_1.default.getCategory);
categoryRouter.get('/name/:name', category_controller_1.default.getCategoryByName);
categoryRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), category_controller_1.default.createCategory);
categoryRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), category_controller_1.default.updateCategory);
categoryRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), category_controller_1.default.deleteCategory);
exports.default = categoryRouter;

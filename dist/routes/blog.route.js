"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const blogRouter = express_1.default.Router();
blogRouter.get('/', blog_controller_1.default.getBlogs);
blogRouter.get('/:id', blog_controller_1.default.getBlog);
blogRouter.get('/user/:id', blog_controller_1.default.getBlogByUser);
blogRouter.get('/category/:category', blog_controller_1.default.getBlogByCategory);
blogRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("user"), blog_controller_1.default.createBlog);
blogRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("user"), blog_controller_1.default.updateBlog);
blogRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("user"), blog_controller_1.default.deleteBlog);
exports.default = blogRouter;

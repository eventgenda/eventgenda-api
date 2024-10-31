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
const blog_repository_1 = __importDefault(require("../repositories/blog.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const blogController = {
    getBlogs: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blogs = yield blog_repository_1.default.getAllBlogs();
            return (0, response_utils_1.successResponseStatus)(response, 'Get all blog successfully.', blogs);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getBlog: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blog = yield blog_repository_1.default.getBlogById(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get blog by id successfully.', blog);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getBlogByUser: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blogs = yield blog_repository_1.default.getBlogByUserId(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get blog by user successfully.', blogs);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getBlogByCategory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = request.params.category;
            const blogs = yield blog_repository_1.default.getBlogByCategory(category);
            return (0, response_utils_1.successResponseStatus)(response, 'Get blog by category successfully.', blogs);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createBlog: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { title, description, content, image, category } = request.body;
            const author = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!author)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User does not exist.', null);
            if (title === '' ||
                description === '' ||
                content === '' ||
                image === '' ||
                category === '') {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all the fields.', null);
            }
            const newBlog = yield blog_repository_1.default.createBlog({
                title,
                description,
                content,
                image,
                category,
                author,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'Create blog successfully.', newBlog);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateBlog: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { title, description, content, image, category } = request.body;
            const author = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!author)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User does not exist.', null);
            if (title === '' ||
                description === '' ||
                content === '' ||
                image === '' ||
                category === '') {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all the fields.', null);
            }
            const blog = yield blog_repository_1.default.updateBlog(request.params.id, {
                title,
                description,
                content,
                author,
                image,
                category,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'Update blog successfully', blog);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteBlog: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield blog_repository_1.default.deleteBlog(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete blog successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = blogController;

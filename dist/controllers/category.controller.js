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
const category_repository_1 = __importDefault(require("../repositories/category.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const CategoryController = {
    getCategories: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield category_repository_1.default.getAllCategories();
            return (0, response_utils_1.successResponseStatus)(response, 'Get all category successfully.', categories);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getCategory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield category_repository_1.default.getCategoryById(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get category by id successfully.', category);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getCategoryByName: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield category_repository_1.default.getCategoryByName(request.params.name);
            return (0, response_utils_1.successResponseStatus)(response, 'Get category by name successfully', category);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createCategory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description } = request.body;
            const categoryIsExist = yield category_repository_1.default.getCategoryByName(name);
            if (categoryIsExist) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'category is already exist', null);
            }
            if (!name || !description) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all field', null);
            }
            const NewCategory = yield category_repository_1.default.createCategory({
                name,
                description,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'create location successfully', NewCategory);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateCategory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description } = request.body;
            const categoryIsExist = yield category_repository_1.default.getCategoryById(request.params.id);
            console.log(categoryIsExist);
            if (!categoryIsExist) {
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Category not exist', null);
            }
            if (!name || !description) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Please fill all the field', null);
            }
            const updateCategory = yield category_repository_1.default.updateCategory(request.params.id, {
                name,
                description,
            });
            return (0, response_utils_1.successResponseStatus)(response, 'updateCategory successfully', updateCategory);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteCategory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryIsExist = yield category_repository_1.default.getCategoryById(request.params.id);
            if (!categoryIsExist) {
                return (0, response_utils_1.errorResponseStatus)(404, // HTTP status code for "Not Found"
                response, 'Category does not exist', null);
            }
            yield category_repository_1.default.deleteCategory(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete category successfully', null);
        }
        catch (error) {
            // Handle any errors that may occur during the process
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = CategoryController;

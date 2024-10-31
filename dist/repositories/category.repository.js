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
const category_model_1 = __importDefault(require("../models/category.model"));
class CategoryRepository {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.default.find().exec();
        });
    }
    getCategoryById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.default.findById(_id).exec();
            if (result === null) {
                throw new Error('Category not found');
            }
            return result;
        });
    }
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield category_model_1.default.findOne({ name: name }).exec();
            return result;
        });
    }
    createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new category_model_1.default(category);
            return yield newCategory.save();
        });
    }
    updateCategory(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default
                .findByIdAndUpdate(id, updates, { new: true })
                .exec();
            if (category === null) {
                throw new Error("update category failed");
            }
            return category;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield category_model_1.default.findByIdAndDelete(id).exec();
        });
    }
}
;
exports.default = new CategoryRepository();

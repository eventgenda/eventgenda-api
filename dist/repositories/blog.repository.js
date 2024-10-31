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
const blog_model_1 = __importDefault(require("../models/blog.model"));
const entity_repository_1 = __importDefault(require("./entity.repository"));
class BlogRepository extends entity_repository_1.default {
    constructor() {
        super(blog_model_1.default);
    }
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().populate('author').exec();
        });
    }
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findById(id).exec();
            if (result === null) {
                throw new Error('Blog not found');
            }
            return result;
        });
    }
    getBlogByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ author: userId }).exec();
        });
    }
    getBlogByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ title }).exec();
        });
    }
    getBlogByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ category }).exec();
        });
    }
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = new this.model(blog);
            return yield newBlog.save();
        });
    }
    updateBlog(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.model
                .findByIdAndUpdate(id, updates, { new: true })
                .exec();
            if (blog === null) {
                throw new Error('Update blog failed');
            }
            return blog;
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = new BlogRepository();

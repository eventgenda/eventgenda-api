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
const project_model_1 = __importDefault(require("../models/project.model"));
const projectRepository = {
    createProject: (projectData) => __awaiter(void 0, void 0, void 0, function* () {
        const project = new project_model_1.default(projectData);
        return yield project.save();
    }),
    findAllProjects: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield project_model_1.default.find().populate('event').populate('createdBy').exec();
    }),
    findProjectById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield project_model_1.default.findById(id)
            .populate('event')
            .populate('createdBy')
            .exec();
    }),
    updateProject: (id, projectData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield project_model_1.default.findByIdAndUpdate(id, projectData, {
            new: true,
        }).exec();
    }),
    deleteProject: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield project_model_1.default.findByIdAndDelete(id).exec();
    }),
};
exports.default = projectRepository;

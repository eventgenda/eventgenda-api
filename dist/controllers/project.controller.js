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
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const project_repositories_1 = __importDefault(require("../repositories/project.repositories"));
const event_repository_1 = __importDefault(require("../repositories/event.repository"));
const projectController = {
    createProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const eventId = req.params.eventId;
            const project = yield project_repositories_1.default.createProject(Object.assign(Object.assign({}, req.body), { createdBy, event: eventId }));
            if (!project) {
                return (0, response_utils_1.errorResponseStatus)(400, res, "Create project failed", null);
            }
            const event = yield event_repository_1.default.getEventById(eventId);
            if (!event) {
                return (0, response_utils_1.errorResponseStatus)(404, res, "Event not found", null);
            }
            event.projects.push(project._id);
            yield event.save();
            return (0, response_utils_1.successResponseStatus)(res, "Project created successfully", project);
        }
        catch (error) {
            (0, error_utils_1.handleError)(res, error);
        }
    }),
    getAllProjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const projects = yield project_repositories_1.default.findAllProjects();
            return (0, response_utils_1.successResponseStatus)(res, "Projects retrieved successfully", projects);
        }
        catch (error) {
            (0, error_utils_1.handleError)(res, error);
        }
    }),
    getProjectById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield project_repositories_1.default.findProjectById(req.params.id);
            if (!project) {
                return (0, response_utils_1.errorResponseStatus)(404, res, "Project not found", null);
            }
            return (0, response_utils_1.successResponseStatus)(res, "Project retrieved successfully", project);
        }
        catch (error) {
            (0, error_utils_1.handleError)(res, error);
        }
    }),
    updateProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield project_repositories_1.default.updateProject(req.params.id, req.body);
            if (!project) {
                return (0, response_utils_1.errorResponseStatus)(404, res, "Project not found", null);
            }
            return (0, response_utils_1.successResponseStatus)(res, "Project updated successfully", project);
        }
        catch (error) {
            (0, error_utils_1.handleError)(res, error);
        }
    }),
    deleteProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const project = yield project_repositories_1.default.deleteProject(req.params.id);
            if (!project) {
                return (0, response_utils_1.errorResponseStatus)(404, res, "Project not found", null);
            }
            return (0, response_utils_1.successResponseStatus)(res, "Project deleted successfully", null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(res, error);
        }
    }),
};
exports.default = projectController;

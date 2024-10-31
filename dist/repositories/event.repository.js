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
const event_model_1 = __importDefault(require("../models/event.model"));
const entity_repository_1 = __importDefault(require("./entity.repository"));
class EventRepository extends entity_repository_1.default {
    constructor() {
        super(event_model_1.default);
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model
                .find()
                .populate('categories')
                .populate({
                path: 'createdBy',
                populate: {
                    path: 'organization',
                },
            })
                .populate('participants')
                .populate({
                path: 'sponsors',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            })
                .populate('rules')
                .populate('projects')
                .populate('location')
                .exec();
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model
                .findById(id)
                .populate('categories')
                .populate({
                path: 'createdBy',
                populate: {
                    path: 'organization',
                },
            })
                .populate('participants')
                .populate({
                path: 'sponsors',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            })
                .populate('rules')
                .populate('projects')
                .populate('location')
                .exec();
            if (result === null) {
                throw new Error('Event not found');
            }
            return result;
        });
    }
    getEventByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model
                .find({ createdBy: userId })
                .populate('categories')
                .populate('createdBy')
                .populate('participants')
                .populate({
                path: 'sponsors',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            })
                .populate('rules')
                .populate('projects')
                .populate('location')
                .exec();
        });
    }
    getEventByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model
                .find({ title })
                .populate('categories')
                .populate('createdBy')
                .populate('participants')
                .populate({
                path: 'sponsors',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            })
                .populate('rules')
                .populate('projects')
                .populate('location')
                .exec();
        });
    }
    getEventByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model
                .find({ categories: categoryId })
                .populate('categories')
                .populate('createdBy')
                .populate('participants')
                .populate({
                path: 'sponsors',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            })
                .populate('rules')
                .populate('projects')
                .populate('location')
                .exec();
        });
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEvent = new this.model(event);
            return yield newEvent.save();
        });
    }
    updateEvent(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.model
                .findByIdAndUpdate(id, updates, { new: true })
                .exec();
            if (event === null) {
                throw new Error('Update event failed');
            }
            return event;
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findByIdAndDelete(id).exec();
        });
    }
    updateEventOne(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findById(id).updateOne(updates).exec();
        });
    }
}
exports.default = new EventRepository();

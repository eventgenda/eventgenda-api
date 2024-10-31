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
const eventRule_model_1 = __importDefault(require("../models/eventRule.model"));
class EventRuleRepository {
    getAllEventRules() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield eventRule_model_1.default.find().exec();
        });
    }
    getEventRuleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield eventRule_model_1.default.findById(id).exec();
            if (result === null) {
                throw new Error('Event rule not found');
            }
            return result;
        });
    }
    getEventRuleByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield eventRule_model_1.default.findOne({ name: name }).exec();
        });
    }
    createEventRule(create) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEventRule = new eventRule_model_1.default(create);
            return yield newEventRule.save();
        });
    }
    updateEventRule(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventRule = yield eventRule_model_1.default.findByIdAndUpdate(id, updates, {
                new: true,
            }).exec();
            if (eventRule === null) {
                throw new Error('Update event rule failed');
            }
            return eventRule;
        });
    }
    deleteEventRule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield eventRule_model_1.default.findByIdAndDelete(id).exec();
            if (result === null) {
                throw new Error('Delete event rule failed');
            }
        });
    }
}
exports.default = new EventRuleRepository();

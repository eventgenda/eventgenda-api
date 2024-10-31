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
const history_model_1 = __importDefault(require("../models/history.model"));
class historyRepository {
    getAllHistories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield history_model_1.default.find().populate('event').populate('user').exec();
        });
    }
    getHistoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield history_model_1.default.findById(id).exec();
            if (result === null) {
                throw new Error('History not found');
            }
            return result;
        });
    }
    getHistoryByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = history_model_1.default.find({ user: user }).populate('event').select('-user').exec();
            if (result === null) {
                throw new Error('History not found');
            }
            return result;
        });
    }
    getHistoryByUserAndEvent(user, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield history_model_1.default.findOne({ event: event, user: user }).exec();
            if (result === null) {
                throw new Error('History not found');
            }
            return result;
        });
    }
    createHistory(create) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHistory = new history_model_1.default(create);
            return yield newHistory.save();
        });
    }
    updateHistory(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield history_model_1.default.findByIdAndUpdate(id, updates, {
                new: true,
            }).exec();
            if (history === null) {
                throw new Error('update history failed');
            }
            return history;
        });
    }
    updateHistoryOne(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield history_model_1.default.findById(id).updateOne(updates).exec();
        });
    }
    deleteHistory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield history_model_1.default.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = new historyRepository();

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
const user_model_1 = __importDefault(require("../models/user.model"));
class UserRepository {
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                throw new Error('User does not exist.');
            const user = yield user_model_1.default.findById(userId)
                .populate('organization')
                .populate({
                path: 'history',
                populate: [{ path: 'event' }, { path: 'user' }],
            })
                .populate('redeemedRewards')
                .select('-password');
            if (!user)
                throw new Error('User does not exist.');
            return user;
        });
    }
    findByOrg(orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!orgId)
                throw new Error('Organization does not exist.');
            const user = yield user_model_1.default.findOne({ organization: orgId })
                .populate('organization')
                .populate('history')
                .select('-password');
            if (!user)
                throw new Error('User does not exist.');
            if (user.role !== 'organizer')
                throw new Error('User is not an organizer.');
            return user;
        });
    }
    updateOne(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.findById(id).updateOne(updates).exec();
        });
    }
}
exports.default = new UserRepository();

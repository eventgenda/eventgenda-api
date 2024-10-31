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
exports.RewardRepository = void 0;
const reward_model_1 = __importDefault(require("../models/reward.model"));
class RewardRepository {
    create(createRewardDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReward = new reward_model_1.default(createRewardDto);
            return yield newReward.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reward_model_1.default.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reward_model_1.default.findById(id);
        });
    }
    update(id, updateRewardDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reward_model_1.default.findByIdAndUpdate(id, updateRewardDto, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield reward_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.RewardRepository = RewardRepository;

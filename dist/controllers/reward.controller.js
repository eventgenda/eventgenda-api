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
exports.RewardController = void 0;
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
class RewardController {
    constructor(rewardRepository) {
        this.createReward = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createRewardDto = req.body;
                const newReward = yield this.rewardRepository.create(createRewardDto);
                return (0, response_utils_1.successResponseStatus)(res, 'Reward created successfully', newReward);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
        this.getAllRewards = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rewards = yield this.rewardRepository.findAll();
                return (0, response_utils_1.successResponseStatus)(res, 'Rewards retrieved successfully', rewards);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
        this.getRewardById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const reward = yield this.rewardRepository.findById(id);
                if (!reward) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Reward not found', null);
                }
                return (0, response_utils_1.successResponseStatus)(res, 'Reward retrieved successfully', reward);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
        this.addRewardToUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const rewardId = req.params.rewardId;
                const user = yield user_repository_1.default.findById(userId);
                const reward = yield this.rewardRepository.findById(rewardId);
                if (!reward) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Reward not found', null);
                }
                user.redeemedRewards.push(reward);
                if (user.rewardPoints < reward.price) {
                    return (0, response_utils_1.errorResponseStatus)(400, res, 'User does not have enough reward points', null);
                }
                user.reward -= reward.price;
                yield user.save();
                return (0, response_utils_1.successResponseStatus)(res, 'Reward added to user successfully', user);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
        this.updateReward = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateRewardDto = req.body;
                const updatedReward = yield this.rewardRepository.update(id, updateRewardDto);
                if (!updatedReward) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Reward not found', null);
                }
                return (0, response_utils_1.successResponseStatus)(res, 'Reward updated successfully', updatedReward);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
        this.deleteReward = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedReward = yield this.rewardRepository.delete(id);
                if (!deletedReward) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Reward not found', null);
                }
                return (0, response_utils_1.successResponseStatus)(res, 'Reward deleted successfully', deletedReward);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
        this.rewardRepository = rewardRepository;
    }
}
exports.RewardController = RewardController;

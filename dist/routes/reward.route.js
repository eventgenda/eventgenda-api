"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reward_controller_1 = require("../controllers/reward.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const reward_repository_1 = require("../repositories/reward.repository");
const rewardRouter = (0, express_1.Router)();
const rewardRepository = new reward_repository_1.RewardRepository();
const rewardController = new reward_controller_1.RewardController(rewardRepository);
// Get all rewards (accessible to all authenticated users)
rewardRouter.get('/', rewardController.getAllRewards);
// Get a specific reward (accessible to all authenticated users)
rewardRouter.get('/:id', rewardController.getRewardById);
// Create a new reward (admin only)
rewardRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)('admin'), rewardController.createReward);
// Add a reward to a user (authenticated users only)
rewardRouter.post('/:rewardId/add', auth_middleware_1.default, (0, role_middleware_1.default)('user', 'organizer'), rewardController.addRewardToUser);
// Update a reward (admin only)
rewardRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)('admin'), rewardController.updateReward);
// Delete a reward (admin only)
rewardRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)('admin'), rewardController.deleteReward);
exports.default = rewardRouter;

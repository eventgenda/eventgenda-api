"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    age: { type: Number, required: true },
    coin: { type: Number, default: 0 },
    rewardPoints: { type: Number, default: 0 },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'organizer'],
    },
    profileImage: { type: String, default: 'https://shorturl.at/CQtT2' },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
    redeemedRewards: [{ type: Schema.Types.ObjectId, ref: 'Reward' }],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('User', userSchema);

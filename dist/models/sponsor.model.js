"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const sponsorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    amount: { type: Number, required: true, default: 0 },
    type: {
        type: String,
        default: 'funding',
        enum: ['funding', 'donation'],
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Sponsor', sponsorSchema);

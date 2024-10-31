"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
const Payment = mongoose_1.default.model('Payment', paymentSchema);
exports.default = Payment;

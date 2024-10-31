"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const HistorySchema = new Schema({
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: {
        type: String,
        default: 'participated',
        enum: ['participated', 'exited', 'created', 'cancelled'],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('History', HistorySchema);

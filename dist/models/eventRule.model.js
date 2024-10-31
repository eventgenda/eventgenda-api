"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const eventRuleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('EventRule', eventRuleSchema);

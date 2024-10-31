"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const organizationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    profileImage: { type: String, default: 'https://shorturl.at/CQtT2' },
    funding: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Organization', organizationSchema);

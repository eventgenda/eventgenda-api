"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const locationSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    prices: { type: Number, default: 0 },
    thumbnail: {
        type: String,
        default: 'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Location', locationSchema);

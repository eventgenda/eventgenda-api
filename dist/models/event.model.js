"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    limit: { type: Number, required: true },
    categories: [
        { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
    rules: [{ type: Schema.Types.ObjectId, ref: 'EventRule' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    prizes: [{ type: Number, default: 0 }],
    thumbnail: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfxwzJDsVxsOL-1O4mtouU1ci1Xxda0gKfQ&s',
    },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    amountRaised: { type: Number, default: 0 },
    amountRequired: { type: Number, default: 0 },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'funding', 'open', 'closed', 'rejected', 'canceled'],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Event', eventSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    link: { type: String, required: true },
    demo: { type: String, required: true },
    event: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event', required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Project', projectSchema);

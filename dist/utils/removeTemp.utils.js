"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTmp = removeTmp;
const fs_1 = __importDefault(require("fs"));
function removeTmp(tempFilePath) {
    fs_1.default.unlink(tempFilePath, (err) => {
        if (err) {
            console.error('Error removing temp file:', err);
        }
    });
}

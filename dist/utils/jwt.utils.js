"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};
exports.createRefreshToken = createRefreshToken;

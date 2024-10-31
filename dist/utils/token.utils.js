"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = exports.generateTokens = void 0;
const jwt_utils_1 = require("./jwt.utils");
const generateTokens = (user) => {
    const { _id, email, password, fullName, userName, age, coin, rewardPoints, role, profileImage, organization, history, redeemedRewards, createdAt, updatedAt, } = user;
    const tokenData = {
        _id,
        email,
        password,
        fullName,
        userName,
        age,
        coin,
        rewardPoints,
        role,
        profileImage,
        organization,
        history,
        redeemedRewards,
        createdAt,
        updatedAt,
    };
    const accessToken = (0, jwt_utils_1.createAccessToken)(tokenData);
    const refreshToken = (0, jwt_utils_1.createRefreshToken)(tokenData);
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const setRefreshTokenCookie = (response, refreshToken) => {
    response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};
exports.setRefreshTokenCookie = setRefreshTokenCookie;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const token_utils_1 = require("../utils/token.utils");
const authController = {
    register: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, userName, email, password, age } = request.body;
            const user = yield user_model_1.default.findOne({ email });
            if (user) {
                return response.status(400).json({ message: 'Email already exists.' });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = new user_model_1.default({
                fullName,
                userName,
                email,
                password: hashedPassword,
                age,
            });
            const { accessToken, refreshToken } = (0, token_utils_1.generateTokens)(newUser);
            (0, token_utils_1.setRefreshTokenCookie)(response, refreshToken);
            yield newUser.save();
            return (0, response_utils_1.successResponseStatus)(response, 'Register successfully.', {
                accessToken,
            });
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    login: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = request.body;
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return response.status(400).json({ message: 'User does not exist.' });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return response.status(400).json({ message: 'Incorrect password.' });
            }
            const { accessToken, refreshToken } = (0, token_utils_1.generateTokens)(user);
            (0, token_utils_1.setRefreshTokenCookie)(response, refreshToken);
            return (0, response_utils_1.successResponseStatus)(response, 'Login successfully.', {
                accessToken,
            });
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    refreshToken: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const refreshToken = request.cookies.refreshToken;
            if (!refreshToken) {
                return response.status(400).json({ message: 'Please login now.' });
            }
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (!decoded)
                return response.status(400).json({ msg: 'Please login now!' });
            const user = yield user_model_1.default.findById(decoded._id).select('-password');
            if (!user)
                return response
                    .status(400)
                    .json({ msg: 'This account does not exist.' });
            const { accessToken } = (0, token_utils_1.generateTokens)(user);
            return (0, response_utils_1.successResponseStatus)(response, 'Refresh token successfully.', {
                accessToken,
            });
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getUserProfile: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const user = yield user_repository_1.default.findById(userId);
            if (!user) {
                return response.status(400).json({ message: 'User does not exist.' });
            }
            return (0, response_utils_1.successResponseStatus)(response, 'Get user profile successfully.', user);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateUserProfile: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const { fullName, userName, email, age } = request.body;
            yield user_repository_1.default.updateOne(userId, {
                fullName,
                userName,
                email,
                age,
            });
            const user = yield user_repository_1.default.findById(userId);
            return (0, response_utils_1.successResponseStatus)(response, 'Update user profile successfully.', user);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = authController;

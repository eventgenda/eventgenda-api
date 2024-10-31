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
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: 'User does not exist.' });
        }
        const user = yield user_repository_1.default.findById(userId.toString());
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        // If we reach here, the user is an admin
        next();
    }
    catch (err) {
        const error = err;
        return res.status(500).json({ msg: error.message });
    }
});
exports.default = authAdmin;

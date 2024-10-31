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
const payment_model_1 = __importDefault(require("../models/payment.model"));
class PaymentRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.find().populate('user event').lean();
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.create(data);
        });
    }
    static findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.findOne(filter).populate('user event').lean();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.findById(id).populate('user event');
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield payment_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = PaymentRepository;

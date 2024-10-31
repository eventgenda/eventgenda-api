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
const stripe_1 = __importDefault(require("stripe"));
const payment_repository_1 = __importDefault(require("../repositories/payment.repository"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
});
const paymentController = {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield payment_repository_1.default.findAll();
                return (0, response_utils_1.successResponseStatus)(res, 'Get all payments successfully.', payments);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { total, status } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const paymentData = {
                    user: userId,
                    total,
                    status,
                };
                const lineItems = [
                    {
                        price_data: {
                            currency: 'thb',
                            product_data: {
                                name: 'Add Coin',
                            },
                            unit_amount: total * 100,
                        },
                        quantity: 1,
                    },
                ];
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['promptpay'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: `http://localhost:3000/payment/success`,
                    cancel_url: `http://localhost:3000/payment/failed`,
                });
                const payment = yield payment_repository_1.default.create(paymentData);
                const paymentResponse = payment.toObject();
                const user = yield user_repository_1.default.findById(userId);
                const updatedUser = yield user_repository_1.default.updateOne(userId, {
                    coin: (user === null || user === void 0 ? void 0 : user.coin) + Math.round(total / 1.1),
                });
                return (0, response_utils_1.successResponseStatus)(res, 'Create new payment successfully.', {
                    paymentResponse,
                    session,
                });
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
    },
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield payment_repository_1.default.findById(id);
                if (!payment) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Payment not found.', null);
                }
                return (0, response_utils_1.successResponseStatus)(res, 'Get payment successfully.', payment);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                // Validate the status
                const validStatuses = ['pending', 'completed', 'failed', 'refunded'];
                if (!validStatuses.includes(status)) {
                    return (0, response_utils_1.errorResponseStatus)(400, res, 'Invalid status provided.', null);
                }
                const updatedPayment = yield payment_repository_1.default.update(id, { status });
                if (!updatedPayment) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Payment not found.', null);
                }
                return (0, response_utils_1.successResponseStatus)(res, 'Payment status updated successfully.', updatedPayment);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedPayment = yield payment_repository_1.default.delete(id);
                if (!deletedPayment) {
                    return (0, response_utils_1.errorResponseStatus)(404, res, 'Payment not found.', null);
                }
                return (0, response_utils_1.successResponseStatus)(res, 'Delete payment successfully.', deletedPayment);
            }
            catch (error) {
                return (0, error_utils_1.handleError)(res, error);
            }
        });
    },
};
exports.default = paymentController;

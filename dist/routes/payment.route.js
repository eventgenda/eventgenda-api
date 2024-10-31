"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const paymentRouter = (0, express_1.Router)();
// Get all payments (admin only)
paymentRouter.get('/', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), payment_controller_1.default.findAll);
// Get a specific payment
paymentRouter.get('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("user", "organizer", "admin"), payment_controller_1.default.findOne);
// Create a new payment
paymentRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("user", "organizer"), payment_controller_1.default.create);
// Update a payment (admin only)
paymentRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), payment_controller_1.default.update);
// Delete a payment (admin only)
paymentRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), payment_controller_1.default.delete);
exports.default = paymentRouter;

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
const organization_model_1 = __importDefault(require("../models/organization.model"));
class OrganizationRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield organization_model_1.default.find().exec();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield organization_model_1.default.findById(id).exec();
            if (!result) {
                throw new Error('Organization not found');
            }
            return result;
        });
    }
    create(create) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = new organization_model_1.default(create);
            return yield organization.save();
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield organization_model_1.default.findByIdAndUpdate(id, update, { new: true }).exec();
            if (!organization) {
                throw new Error('Update organization failed');
            }
            return organization;
        });
    }
    updateOne(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield organization_model_1.default.findById(id).updateOne(updates).exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield organization_model_1.default.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = new OrganizationRepository();

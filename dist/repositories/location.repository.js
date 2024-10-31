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
const location_model_1 = __importDefault(require("../models/location.model"));
class LocationRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield location_model_1.default.find().exec();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield location_model_1.default.findById(id).exec();
            if (result === null) {
                throw new Error('Location not found');
            }
            return result;
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield location_model_1.default.find({ name: name }).exec();
            if (result === null) {
                throw new Error('Location not found');
            }
            return result;
        });
    }
    create(create) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLocation = new location_model_1.default(create);
            return yield newLocation.save();
        });
    }
    update(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield location_model_1.default.findByIdAndUpdate(id, updates, { new: true }).exec();
            if (location === null) {
                throw new Error('Update location failed');
            }
            return location;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield location_model_1.default.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = new LocationRepository();

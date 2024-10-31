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
const sponsor_model_1 = __importDefault(require("../models/sponsor.model"));
const entity_repository_1 = __importDefault(require("./entity.repository"));
class SponsorRepository extends entity_repository_1.default {
    constructor() {
        super(sponsor_model_1.default);
    }
    getAllSponsors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().populate('user').populate('event').exec();
        });
    }
    getSponsorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model
                .findById(id)
                .populate('user')
                .populate('event')
                .exec();
        });
    }
    getSponsorsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ user: userId }).exec();
        });
    }
    getSponsorsByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ event: eventId }).exec();
        });
    }
    getSponsorByUserAndEvent(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ user: userId, event: eventId }).exec();
        });
    }
    createSponsor(create) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSponsor = new this.model(create);
            return yield newSponsor.save();
        });
    }
    updateSponsor(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const sponsor = yield this.model
                .findByIdAndUpdate(id, updates, {
                new: true,
            })
                .exec();
            if (!sponsor) {
                throw new Error('Update sponsor failed');
            }
            return sponsor;
        });
    }
    deleteSponsor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = new SponsorRepository();

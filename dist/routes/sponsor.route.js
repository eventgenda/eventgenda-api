"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sponsor_controller_1 = __importDefault(require("../controllers/sponsor.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const sponsorRouter = express_1.default.Router();
sponsorRouter.get('/', sponsor_controller_1.default.getSponsors);
sponsorRouter.get('/:id', sponsor_controller_1.default.getSponsor);
sponsorRouter.get('/event/:id', sponsor_controller_1.default.getSponsorByEvent);
sponsorRouter.get('/user/:id', sponsor_controller_1.default.getSponsorByUser);
sponsorRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("user", "organizer"), sponsor_controller_1.default.createSponsor);
sponsorRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), sponsor_controller_1.default.updateSponsor);
sponsorRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), sponsor_controller_1.default.deleteSponsor);
exports.default = sponsorRouter;

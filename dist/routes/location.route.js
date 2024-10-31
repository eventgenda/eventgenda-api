"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = __importDefault(require("../controllers/location.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const locationRouter = express_1.default.Router();
locationRouter.get('/', location_controller_1.default.getLocations);
locationRouter.get('/:id', location_controller_1.default.getLocation);
locationRouter.get('/name/:name', location_controller_1.default.getLocationByName);
locationRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), location_controller_1.default.createLocation);
locationRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), location_controller_1.default.updateLocation);
locationRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("admin"), location_controller_1.default.deleteLocation);
exports.default = locationRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//  defines API endpoints and links them to controller methods
const express_1 = __importDefault(require("express"));
const eventRule_controller_1 = __importDefault(require("../controllers/eventRule.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const role_middleware_1 = __importDefault(require("../middlewares/role.middleware"));
const eventRuleRouter = express_1.default.Router();
// Get all event rules - accessible to all users
eventRuleRouter.get('/', eventRule_controller_1.default.getAllEventRules);
// Get a specific event rule by ID 
eventRuleRouter.get('/:id', eventRule_controller_1.default.getEventRule);
// Create a new event rule - restricted to admin users
eventRuleRouter.post('/', auth_middleware_1.default, (0, role_middleware_1.default)("organizer", "admin"), eventRule_controller_1.default.createEventRule);
// Update an existing event rule - restricted to admin users
eventRuleRouter.put('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("organizer", "admin"), eventRule_controller_1.default.updateEventRule);
// Delete an event rule - restricted to admin users
eventRuleRouter.delete('/:id', auth_middleware_1.default, (0, role_middleware_1.default)("organizer", "admin"), eventRule_controller_1.default.deleteEventRule);
exports.default = eventRuleRouter;

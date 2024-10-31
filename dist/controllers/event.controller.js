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
const event_repository_1 = __importDefault(require("../repositories/event.repository"));
const history_repository_1 = __importDefault(require("../repositories/history.repository"));
const location_repository_1 = __importDefault(require("../repositories/location.repository"));
const organization_repository_1 = __importDefault(require("../repositories/organization.repository"));
const sponsor_repository_1 = __importDefault(require("../repositories/sponsor.repository"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const error_utils_1 = require("../utils/error.utils");
const response_utils_1 = require("../utils/response.utils");
const processEventFunding = (request, response, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
        const { amount } = request.body;
        const event = yield event_repository_1.default.getEventById(request.params.id);
        const createdBy = event.createdBy;
        if (event.status !== 'funding') {
            return (0, response_utils_1.errorResponseStatus)(400, response, 'This event is not currently open for funding.', null);
        }
        if (userId === createdBy) {
            return (0, response_utils_1.errorResponseStatus)(400, response, 'You cannot fund your own event.', null);
        }
        if (event.participants.includes(userId)) {
            return (0, response_utils_1.errorResponseStatus)(400, response, 'You cannot fund an event you are already participating in.', null);
        }
        if (amount <= 0) {
            return (0, response_utils_1.errorResponseStatus)(400, response, 'Amount must be greater than 0.', null);
        }
        if (event.amountRaised >= event.amountRequired) {
            return (0, response_utils_1.errorResponseStatus)(400, response, 'This event has reached the required amount.', null);
        }
        // check user's coin
        const user = yield user_repository_1.default.findById(userId);
        if (user.coin < amount) {
            return (0, response_utils_1.errorResponseStatus)(400, response, 'Not enough coin.', null);
        }
        // create sponsor
        let sponsor;
        const sponsorExist = yield sponsor_repository_1.default.getSponsorByUserAndEvent(userId, request.params.id);
        if (sponsorExist) {
            sponsorExist.amount += amount;
            sponsor = yield sponsorExist.save();
        }
        else {
            sponsor = yield sponsor_repository_1.default.createSponsor({
                user: userId,
                event: request.params.id,
                amount: amount,
                type: type,
            });
            event.sponsors.push(sponsor);
        }
        // Update the event's raised amount
        const newAmount = event.amountRaised + amount;
        event.amountRaised = newAmount;
        if (newAmount >= event.amountRequired) {
            event.status = 'open';
        }
        yield event.save();
        // update organization's coin
        const organizer = yield user_repository_1.default.findById(createdBy);
        const organization = yield organization_repository_1.default.getById(organizer.organization);
        organization.funding += amount;
        yield organization.save();
        // update coin and reward to user
        user.coin -= amount;
        user.rewardPoints += amount * 0.1;
        yield user.save();
        return (0, response_utils_1.successResponseStatus)(response, `${type === 'funding' ? 'Funding' : 'Donate'} event successfully.`, sponsor);
    }
    catch (error) {
        (0, error_utils_1.handleError)(response, error);
    }
});
const eventController = {
    getEvents: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const events = yield event_repository_1.default.getAllEvents();
            // change the event status
            for (const event of events) {
                if (event.eventEndDate < new Date() && event.status === 'open') {
                    event.status = 'closed';
                    const organizer = yield user_repository_1.default.findById(event.createdBy);
                    const organization = yield organization_repository_1.default.getById(organizer.organization);
                    organization.credit +=
                        (event.participants.length / event.limit) * 100;
                    yield organization.save();
                    yield event.save();
                }
                if (event.registrationEndDate < new Date() &&
                    event.amountRaised < event.amountRequired) {
                    event.status = 'canceled';
                    // Map to accumulate refund amounts per user
                    const refundMap = new Map();
                    for (const sponsor of event.sponsors) {
                        const userId = sponsor.user._id;
                        const amount = sponsor.amount;
                        // Accumulate the refund amount for the user
                        if (refundMap.has(userId)) {
                            refundMap.set(userId, refundMap.get(userId) + amount);
                        }
                        else {
                            refundMap.set(userId, amount);
                        }
                    }
                    // Process refunds for each user
                    for (const [userId, totalAmount] of refundMap.entries()) {
                        const user = yield user_repository_1.default.findById(userId);
                        if (!user) {
                            return (0, response_utils_1.errorResponseStatus)(400, response, 'User not found.', null);
                        }
                        user.coin += totalAmount;
                        event.amountRaised -= totalAmount;
                        yield user.save();
                        console.log(`Refunded ${totalAmount} coins to user ${userId}`);
                    }
                    yield event.save();
                }
            }
            return (0, response_utils_1.successResponseStatus)(response, 'Get all events successfully.', events);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const event = yield event_repository_1.default.getEventById(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Get event by id successfully.', event);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getEventByUser: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const events = yield event_repository_1.default.getEventByUserId(userId);
            return (0, response_utils_1.successResponseStatus)(response, 'Get event by user successfully.', events);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    getEventByCategory: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = request.params.category;
            const events = yield event_repository_1.default.getEventByCategory(category);
            return (0, response_utils_1.successResponseStatus)(response, 'Get event by category successfully.', events);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    createEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const { title, location, eventStartDate, eventEndDate, registrationStartDate, registrationEndDate, } = request.body;
            // validate date
            if (eventStartDate >= eventEndDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event start date must be before event end date.', null);
            }
            if (registrationStartDate >= registrationEndDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Registration start date must be before registration end date.', null);
            }
            if (registrationStartDate >= eventStartDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Registration start date must be before event start date.', null);
            }
            if (registrationEndDate >= eventEndDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Registration end date must be before event end date.', null);
            }
            // validate title
            const existingEvent = yield event_repository_1.default.getEventByTitle(title);
            if (existingEvent.length > 0) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event title already exists.', null);
            }
            // validate location
            const existingLocation = yield location_repository_1.default.getById(location);
            if (!existingLocation) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Location is not available.', null);
            }
            request.body.createdBy = userId;
            const event = yield event_repository_1.default.createEvent(request.body);
            return (0, response_utils_1.successResponseStatus)(response, 'Create event successfully.', event);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    updateEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const { title, location, eventStartDate, eventEndDate, registrationStartDate, registrationEndDate, } = request.body;
            // validate date
            if (eventStartDate >= eventEndDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event start date must be before event end date.', null);
            }
            if (registrationStartDate >= registrationEndDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Registration start date must be before registration end date.', null);
            }
            if (registrationStartDate >= eventStartDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Registration start date must be before event start date.', null);
            }
            if (registrationEndDate >= eventEndDate) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Registration end date must be before event end date.', null);
            }
            // validate location
            const existingLocation = yield location_repository_1.default.getById(location);
            if (!existingLocation) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Location is not available.', null);
            }
            request.body.createdBy = userId;
            const event = yield event_repository_1.default.updateEvent(request.params.id, request.body);
            return (0, response_utils_1.successResponseStatus)(response, 'Update event successfully.', event);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    deleteEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield event_repository_1.default.deleteEvent(request.params.id);
            return (0, response_utils_1.successResponseStatus)(response, 'Delete event successfully.', null);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    fundingEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        processEventFunding(request, response, 'funding');
    }),
    donateEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        processEventFunding(request, response, 'donation');
    }),
    joinEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const event = yield event_repository_1.default.getEventById(request.params.eventId);
            if (!event)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event not found.', null);
            if (event.status !== 'open') {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event is not open for registration.', null);
            }
            if (event.participants.includes(userId)) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User already joined the event.', null);
            }
            if (event.participants.length >= event.limit) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event is full.', null);
            }
            const user = yield user_repository_1.default.findById(userId);
            if (!user)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User not found.', null);
            event.participants.push(user);
            if (event.participants.length == event.limit) {
                event.status = 'closed';
            }
            yield event.save();
            const history = yield history_repository_1.default.createHistory({
                user: userId,
                event: event._id,
                action: 'participated',
            });
            if (!history)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Create history failed.', null);
            user.history.push(history._id);
            yield user.save();
            return (0, response_utils_1.successResponseStatus)(response, 'Join Event Successfully', event);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    exitEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a._id;
            const event = yield event_repository_1.default.getEventById(request.params.eventId);
            if (!event)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event not found.', null);
            if (event.status !== 'open') {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Exiting the event is not allowed at this moment.', null);
            }
            const isParticipant = event.participants.some((participantId) => participantId._id.equals(userId));
            if (!isParticipant) {
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User is not a participant of this event.', null);
            }
            event.participants = event.participants.filter((participantId) => !participantId._id.equals(userId));
            yield event.save();
            const history = yield history_repository_1.default.getHistoryByUserAndEvent(userId, request.params.eventId);
            if (!history)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'History not found.', null);
            history.action = 'exited';
            yield history.save();
            return (0, response_utils_1.successResponseStatus)(response, 'Exit event Successfully', event);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    cancelEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventId = request.params.eventId;
            const event = yield event_repository_1.default.getEventById(eventId);
            if (!event) {
                return (0, response_utils_1.errorResponseStatus)(404, response, 'Event not found.', null);
            }
            event.status = 'canceled';
            // Map to accumulate refund amounts per user
            const refundMap = new Map();
            for (const sponsor of event.sponsors) {
                const userId = sponsor.user._id;
                const amount = sponsor.amount;
                // Accumulate the refund amount for the user
                if (refundMap.has(userId)) {
                    refundMap.set(userId, refundMap.get(userId) + amount);
                }
                else {
                    refundMap.set(userId, amount);
                }
            }
            // Process refunds for each user
            for (const [userId, totalAmount] of refundMap.entries()) {
                const user = yield user_repository_1.default.findById(userId);
                if (!user) {
                    return (0, response_utils_1.errorResponseStatus)(400, response, 'User not found.', null);
                }
                user.coin += totalAmount;
                event.amountRaised -= totalAmount;
                yield user.save();
                console.log(`Refunded ${totalAmount} coins to user ${userId}`);
            }
            yield event.save();
            return (0, response_utils_1.successResponseStatus)(response, 'Event canceled successfully.', event);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    approveEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventId = request.params.eventId;
            const event = yield event_repository_1.default.getEventById(eventId);
            if (!event)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event not found.', null);
            const status = event.amountRequired === 0 ? 'open' : 'funding';
            event.status = status;
            yield event.save();
            const userId = event.createdBy;
            const user = yield user_repository_1.default.findById(userId);
            if (!user)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'User not found.', null);
            const history = yield history_repository_1.default.createHistory({
                user: userId,
                event: eventId,
                action: 'created',
            });
            if (!history)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Create history failed.', null);
            user.history.push(history._id);
            yield user.save();
            return (0, response_utils_1.successResponseStatus)(response, 'event approved', event.status);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
    rejectEvent: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventId = request.params.eventId;
            const event = yield event_repository_1.default.getEventById(eventId);
            if (!event)
                return (0, response_utils_1.errorResponseStatus)(400, response, 'Event not found.', null);
            event.status = 'rejected';
            yield event.save();
            return (0, response_utils_1.successResponseStatus)(response, 'event rejected', event.status);
        }
        catch (error) {
            (0, error_utils_1.handleError)(response, error);
        }
    }),
};
exports.default = eventController;

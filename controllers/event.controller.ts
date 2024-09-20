import { Request, Response } from 'express';
import eventRepository from '../repositories/event.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
import sponsorRepository from '../repositories/sponsor.repository';
import userRepository from '../repositories/user.repository';
import { fundingEventDto } from '../common/dto/event.dto';

const processEventFunding = async (
  request: Request, 
  response: Response, 
  type: 'funding' | 'donation'
) => {
  try {
    const userId = request.user?._id;
    const { amount } = request.body as fundingEventDto;
    const event = await eventRepository.getEventById(request.params.id);

    if (event.status === 'closed') {
      throw new Error('Event is closed');
    }

    if (amount < 0) {
      throw new Error('Amount must be greater than 0');
    }

    if (event.amountRaised >= event.amountRequired) {
      throw new Error('Event has reached the required amount');
    }

    // update user's coin
    const user = await userRepository.findById(userId);
    if (user.coin < amount) {
      throw new Error('User does not have enough coin to fund this event');
    }
    const newCoin = user.coin - amount;
    await userRepository.updateOne(userId, { coin: newCoin });

    // Update the event's raised amount
    const newAmount = event.amountRaised + amount;
    await eventRepository.updateEventOne(request.params.id, { amountRaised: newAmount });

    // Create a new sponsor
    const sponsor = await sponsorRepository.create({
      user: userId,
      event: request.params.id,
      amount,
      type
    });

    if (!sponsor) {
      throw new Error('Failed to create sponsor');
    }

    // Update the event status if the required amount is reached
    if (newAmount >= event.amountRequired) {
      await eventRepository.updateEventOne(request.params.id, { status: 'open' });
    }

    return successResponseStatus(
      response,
      `${type === 'funding' ? 'Funding' : 'Donate'} event successfully.`,
      sponsor
    );
  } catch (error) {
    handleError(response, error);
  }
};

const eventController = {
  getEvents: async (request: Request, response: Response) => {
    try {
      const events = await eventRepository.getAllEvents();
      return successResponseStatus(
        response,
        'Get all events successfully.',
        events
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEvent: async (request: Request, response: Response) => {
    try {
      const event = await eventRepository.getEventById(request.params.id);
      return successResponseStatus(
        response,
        'Get event by id successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEventByUser: async (request: Request, response: Response) => {
    try {
      const events = await eventRepository.getEventByUserId(request.params.id);
      return successResponseStatus(
        response,
        'Get event by user successfully.',
        events
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  getEventByCategory: async (request: Request, response: Response) => {
    try {
      const category = request.params.category;
      const events = await eventRepository.getEventByCategory(category);
      return successResponseStatus(
        response,
        'Get event by category successfully.',
        events
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  createEvent: async (request: Request, response: Response) => {
    try {
      const event = await eventRepository.createEvent(request.body);
      return successResponseStatus(
        response,
        'Create event successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateEvent: async (request: Request, response: Response) => {
    try {
      const event = await eventRepository.updateEvent(
        request.params.id,
        request.body
      );
      return successResponseStatus(
        response,
        'Update event successfully.',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  deleteEvent: async (request: Request, response: Response) => {
    try {
      await eventRepository.deleteEvent(request.params.id);
      return successResponseStatus(
        response,
        'Delete event successfully.',
        null
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  updateEventStatus: async (request: Request, response: Response) => {
    try {
      const { id, status } = request.body;
      const event = eventRepository.updateEventOne(id, { status });
      return successResponseStatus(
        response,
        'Update event status successfully',
        event
      );
    } catch (error) {
      handleError(response, error);
    }
  },

  fundingEvent: async (request: Request, response: Response) => {
    processEventFunding(request, response, 'funding');
  },
  
  donateEvent: async (request: Request, response: Response) => {
    processEventFunding(request, response, 'donation');
  }
};

export default eventController;
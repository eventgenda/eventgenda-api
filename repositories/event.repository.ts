import { CreateEventDto } from '../common/dto/event.dto';
import eventModel from '../models/event.model';
import { EventDocument } from '../types/event';
import BaseRepository from './entity.repository';

class EventRepository extends BaseRepository<EventDocument> {
  constructor() {
    super(eventModel);
  }

  async getAllEvents(): Promise<EventDocument[]> {
    return await this.model.find().exec();
  }

  async getEventById(id: string): Promise<EventDocument> {
    const result = await this.model.findById(id).exec();
    if (result === null) {
      throw new Error('Event not found');
    }
    return result;
  }

  async getEventByUserId(userId: string): Promise<EventDocument[]> {
    return await this.model.find({ createdBy: userId }).exec();
  }

  async getEventByTitle(title: string): Promise<EventDocument[]> {
    return await this.model.find({ title }).exec();
  }

  async getEventByCategory(category: string): Promise<EventDocument[]> {
    return await this.model.find({ category }).exec();
  }

  async createEvent(event: CreateEventDto): Promise<EventDocument> {
    const newEvent = new this.model(event);
    return await newEvent.save();
  }

  async updateEvent(
    id: string,
    updates: CreateEventDto
  ): Promise<EventDocument> {
    const event = await this.model
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (event === null) {
      throw new Error('Update event failed');
    }

    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async updateEventOne(id: string, updates: Partial<CreateEventDto>): Promise<void> {
    await this.model.findById(id).updateOne(updates).exec();
  }
}

export default new EventRepository();

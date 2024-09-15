import { Document } from 'mongoose';
import { CategoryType } from './category';
import { EventRuleType } from './eventRule';
import { LocationType } from './location';
import { SponsorType } from './sponsor';
import { UserType } from './user';

export type EventType = {
  title: string;
  description: string;
  limit: number;
  category: CategoryType;
  createdBy: UserType;
  eventStartDate: Date;
  eventEndDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  participants: UserType[];
  sponsor: SponsorType;
  eventRule: EventRuleType;
  donate: UserType[];
  projects: any;
  prizes: number[];
  thumbnail: string;
  location: LocationType;
  createdAt: Date;
  updatedAt: Date;
} & Document;

export type EventDocument = EventType & Document;
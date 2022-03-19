import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema, } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent";
import { ValueSchema } from '../models/Value'
import { TicketSchema } from '../models/Ticket'
import { CommentSchema } from '../models/Comment'


class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);
  Comments = mongoose.model('Comment', CommentSchema);

  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()

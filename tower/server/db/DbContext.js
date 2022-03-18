import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema, } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent";
import { ValueSchema } from '../models/Value'
class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()

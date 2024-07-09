import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { MessageSChema } from "../models/Message.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Message = mongoose.model('Message', MessageSChema);
}

export const dbContext = new DbContext()

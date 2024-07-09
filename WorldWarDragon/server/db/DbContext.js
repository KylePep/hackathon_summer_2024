import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { MessageSChema } from "../models/Message.js";
import { AssistanceSChema } from "../models/Assistance.js";
import { BossSchema } from "../models/Boss.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Message = mongoose.model('Message', MessageSChema);
  Assistance = mongoose.model('Assistance', AssistanceSChema);
  Boss = mongoose.model('Boss', BossSchema);
}

export const dbContext = new DbContext()

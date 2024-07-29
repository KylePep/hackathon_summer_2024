import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { MessageSChema } from "../models/Message.js";
import { AssistanceSChema } from "../models/Assistance.js";
import { BossSchema } from "../models/Boss.js";
import { BossDamageSchema } from "../models/BossDamage.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Message = mongoose.model('Message', MessageSChema);
  Assistance = mongoose.model('Assistance', AssistanceSChema);
  Boss = mongoose.model('Boss', BossSchema);
  BossDamage = mongoose.model('BossDamage', BossDamageSchema);
}

export const dbContext = new DbContext()

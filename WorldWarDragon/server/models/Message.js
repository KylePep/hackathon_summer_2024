import { Schema } from "mongoose"

export const MessageSChema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  roomId: { type: String, required: true },
  body: { type: String, required: true },
  boon: { type: String, required: true, default: 'power' }
},
  { timestamps: true, toJSON: { virtuals: true } })

MessageSChema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
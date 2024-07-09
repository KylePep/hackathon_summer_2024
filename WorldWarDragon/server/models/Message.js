import { Schema } from "mongoose"

export const MessageSChema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  roomId: { type: String, required: true },
  body: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

MessageSChema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
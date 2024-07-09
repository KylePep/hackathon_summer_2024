import { Schema } from "mongoose"

export const AssistanceSChema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  roomId: { type: String, required: true },
  body: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

AssistanceSChema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
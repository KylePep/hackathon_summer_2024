import { Schema } from "mongoose"

export const BossDamageSchema = new Schema({
  dmg: { type: Number, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  bossId: { type: Schema.Types.ObjectId, required: true, ref: 'Boss' },
},
  { timestamps: true, toJSON: { virtuals: true } })

BossDamageSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
BossDamageSchema.virtual('boss', {
  localField: 'bossId',
  ref: 'Boss',
  foreignField: '_id',
  justOne: true
})
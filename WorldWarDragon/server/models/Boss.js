import { Schema } from "mongoose"

export const BossSchema = new Schema({
  name: { type: String, required: true },
  hp: { type: Number, required: true },
  image: { type: String, required: true },
  active: { type: Boolean, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })
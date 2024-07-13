import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    valor: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    health: { type: Number, default: 100 },
    power: { type: Number, default: 1 },
    attack: { type: Number, default: 0 },
    shield: { type: Number, default: 0 },
    heal: { type: Number, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)


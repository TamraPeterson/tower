import mongoose from "mongoose"
const Schema = mongoose.Schema


export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TicketEvent' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)
TicketSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
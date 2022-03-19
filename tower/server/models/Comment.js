import mongoose from "mongoose"
const Schema = mongoose.Schema


export const CommentSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true },

},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('towerEvent', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})
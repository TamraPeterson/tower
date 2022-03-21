import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class CommentsService {
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }
  async createComment(comment) {
    // const towerEvent = await towerEventsService.getOne(comment.eventId)
    const newComment = await dbContext.Comments.create(comment)
    await newComment.populate('creator', 'name picture')
    return newComment
  }
  async deleteComment(id, userId) {
    const comment = await dbContext.Comments.findById(id)
    if (comment.creatorId.toString() != userId) {
      throw new BadRequest('not your comment!')
    }
    await dbContext.Comments.findOneAndRemove({ _id: id })
  }

}

export const commentsService = new CommentsService()
import { dbContext } from "../db/DbContext"
import { towerEventsService } from "./TowerEventsService"

class CommentsService {
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }
  async createComment(comment) {
    const towerEvent = await towerEventsService.getOne(comment.eventId)
    const newComment = await dbContext.Comments.create(comment)
    await newComment.populate('creator', 'name picture')
    return newComment
  }
  deleteComment(userId, commentId, body) {
    throw new Error("Method not implemented.");
  }

}

export const commentsService = new CommentsService()
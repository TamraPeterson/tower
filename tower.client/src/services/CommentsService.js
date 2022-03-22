import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService {
  async newComment(comment) {
    const res = await api.post('api/comments', comment)
    logger.log('new comment', comment)
    AppState.comments.push(res.data)
    this.getComments(comment.eventId)
    return res.data
  }
  async getComments(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log('getting comments', res.data)
    AppState.comments = res.data
  }
  async removeComment(id, eventId) {
    await api.delete('api/comments/' + id)
    AppState.comments.filter(c => c.id === id)
    this.getComments(eventId)
  }
}

export const commentsService = new CommentsService()
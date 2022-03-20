import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  async newComment(comment) {
    const res = await api.post('api/comments', comment)
    logger.log('new comment', comment)
    AppState.comments.push(res.data)
    return res.data
  }
  async getComments(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log('getting comments', res.data)
    AppState.comments.filter = res.data
  }
}

export const commentsService = new CommentsService()
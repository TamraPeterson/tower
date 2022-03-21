import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
  //FIXME comments don't persist on refresh, so they aren't staying in the appstate
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
    AppState.comments.filter = res.data
  }
}

export const commentsService = new CommentsService()
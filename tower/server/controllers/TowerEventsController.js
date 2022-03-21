import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import { ticketsService } from "../services/TicketsService"
import { towerEventsService } from "../services/TowerEventsService"
import BaseController from '../utils/BaseController'


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/tickets', this.getEventTickets)
      .get('/:id/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.cancelEvent)
      .put('/:id', this.update)
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getOne(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets({ eventId: req.params.id })
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await towerEventsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const isCancelled = await towerEventsService.cancelEvent(req.params.id, req.userInfo.id)
      return res.send(isCancelled)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.update(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

}
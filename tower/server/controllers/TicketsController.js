import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.deleteTicket)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const userId = req.userInfo.id
      const ticketId = req.params.id
      await ticketsService.deleteTicket(userId, ticketId, req.body)
      return res.send('ticket deleted')
    } catch (error) {
      next(error)
    }
  }
}
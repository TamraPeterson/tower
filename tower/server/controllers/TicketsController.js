import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from '../services/TicketsService'
import BaseController from '../utils/BaseController'

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
    // .put('/:id', this.editTicket)
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

  // async editTicket(req, res, next) {
  //   try {
  //     req.body.accountId = req.userInfo.id
  //     const update = await ticketsService.createOrUpdate(req.body)
  //     return res.send(update)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
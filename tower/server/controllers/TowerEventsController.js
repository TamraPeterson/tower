import { Auth0Provider } from "@bcwdev/auth0provider"
import { towerEventsService } from "../services/TowerEventsService"
import BaseController from '../utils/BaseController'


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
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
      const isCancelled = await towerEventsService.cancelEvent(req.params.id)
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
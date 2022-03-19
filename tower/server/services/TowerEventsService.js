import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from "../utils/Errors"
class TowerEventsService {

  async getAll(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query)
    return towerEvents
  }

  async getOne(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator')
    if (!towerEvent) {
      throw new BadRequest('Invalid Id Yo')
    }
    return towerEvent
  }
  async create(newTowerEvent) {
    let now = new Date()
    let currentDate = now.toLocaleDateString()
    if (newTowerEvent.startDate < currentDate) {
      throw new BadRequest('That date has already passed')
    }
    const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }


  async cancelEvent(eventId, userId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
    if (towerEvent.creatorId != userId) {
      throw new BadRequest('this is not your event')
    }
    towerEvent.isCanceled = !towerEvent.isCanceled
    await towerEvent.save()
    return towerEvent.isCanceled
  }

  async update(update) {
    const originalEvent = await this.getOne(update.id)
    if (originalEvent.isCanceled) {
      throw new BadRequest('You cant edit a cancelled event')
    }
    else if (originalEvent.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('Get outta town, thats not your event')
    }
    originalEvent.name = update.name ? update.name : originalEvent.name
    originalEvent.description = update.description ? update.description : originalEvent.description
    originalEvent.coverImg = update.coverImg ? update.coverImg : originalEvent.coverImg
    originalEvent.location = update.location ? update.location : originalEvent.location
    originalEvent.capacity = update.capacity ? update.capacity : originalEvent.capacity
    originalEvent.startDate = update.startDate ? update.startDate : originalEvent.startDate
    originalEvent.type = update.type ? update.type : originalEvent.type
    await originalEvent.save()
    return originalEvent
  }
}

export const towerEventsService = new TowerEventsService()
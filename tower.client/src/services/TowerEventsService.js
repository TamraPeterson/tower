import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TowerEventsService {
  async getAllEvents() {
    try {
      const res = await api.get('api/events')
      logger.log('get all events', res.data)
      AppState.towerEvents = res.data
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  // async getNewer() {
  //   const res = await api.get(AppState.newerPage)
  //   logger.log('get newer', res.data)
  //   AppState.towerEvents = res.data.events
  //   AppState.newerPage = res.data.newer
  //   AppState.olderPage = res.data.older

  // }
  // async getOlder() {
  //   const res = await api.get(AppState.olderPage)
  //   logger.log('get older', res.data)
  //   AppState.posts = res.data.events
  //   AppState.newerPage = res.data.newer
  //   AppState.olderPage = res.data.older
  // }

  async getById(id) {
    try {
      const res = await api.get('api/events/' + id)
      logger.log('get event by id', res.data)
      AppState.activeEvent = res.data
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async getFilteredEvents(query) {
    try {
      const res = await api.get('api/events')
      logger.log('getting events before filtering', res.data, query)
      AppState.towerEvents = res.data
      AppState.towerEvents = AppState.towerEvents.filter(t => t.type == query)
      logger.log('filtered events', AppState.towerEvents);

    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async create(eventData) {
    const res = await api.post('api/events', eventData)
    logger.log('creating event', res.data)
    AppState.towerEvents.push(res.data)
    return res.send
  }

  async update(update) {
    const res = await api.put('api/events/' + update.id, update)
    AppState.activeEvent = res.data
  }

  async cancelEvent(id) {
    const res = await api.get('api/events/' + id)
    logger.log('cancel events', res.data)
    res.data.isCanceled = !res.data.isCanceled
    // await api.put('api/events', res.data)
    // return res.data
    // FIXME Event isn't updating for good
  }
}

export const towerEventsService = new TowerEventsService()
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
}

export const towerEventsService = new TowerEventsService()
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
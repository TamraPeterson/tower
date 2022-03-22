import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyEvents() {
    try {
      const res = await api.get('/account/tickets')
      logger.log('getting my events', res.data)
      AppState.myAccountTickets = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async cancelMyTicket(towerEvent) {
    await api.delete('/api/tickets/' + towerEvent.eventId)
    // try {
    //   logger.log('cancel ticket', towerEvent)
    //   AppState.myAccountTickets = AppState.myAccountTickets.filter(t => t.id != ticket.id)
    //   this.getMyEvents
    //   logger.log('remove ticket', AppState.myAccountTickets)
    // } catch (error) {
    //   logger.log(error)
    // }
  }
}

export const accountService = new AccountService()

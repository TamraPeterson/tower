import { applyStyles } from "@popperjs/core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService";

class TicketsService {

  async getEventTickets(eventId) {

    const res = await api.get('api/events/' + eventId + '/tickets')
    logger.log('getting tickets', res.data);
    AppState.tickets = res.data
  }

  async createTicket(newTicket) {

    const res = await api.post('api/tickets', newTicket)
    logger.log('creating ticket', res.data)
    AppState.tickets.push(newTicket)
    AppState.myAccountTickets.push(newTicket)
  }

  async cancelMyTicket(towerEvent) {
    await api.delete('api/tickets/' + towerEvent.ticketId)
    towerEvent.capacity++
    AppState.towerEvents.push(towerEvent)
    logger.log('deleted', towerEvent)
    // logger.log('delete ticket', towerEvent.ticketId)
    // try {
    //   logger.log('cancel ticket', towerEvent)
    //   AppState.myAccountTickets = AppState.myAccountTickets.filter(t => t.id != towerEvent.id)
    //   this.getMyEvents
    //   logger.log('remove ticket', AppState.myAccountTickets)
    // } catch (error) {
    //   logger.log(error)
    // }
  }
}
export const ticketsService = new TicketsService()
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
}

export const ticketsService = new TicketsService()
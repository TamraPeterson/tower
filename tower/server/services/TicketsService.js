import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class TicketsService {

  async createTicket(ticket) {
    const towerEvent = await towerEventsService.getOne(ticket.eventId)
    const newTicket = await dbContext.Tickets.create(ticket)
    let eventUpdate = towerEvent.capacity--
    towerEventsService.update(eventUpdate)
    return newTicket
  }
  // get cars this account has bid on
  // async getMyTickets(query) {

  // }


  // get accounts that have bid on this car
  //   async getEventTickets(query) {
  //   const attendees = await dbContext.Tickets.find(query).populate('attendee', 'name picture')
  //   return bidderBids.map(mongooseDocument => {
  //     const bidderBid = mongooseDocument.toJSON()
  //     return {
  //       bidId: bidderBid.id,
  //       amount: bidderBid.amount,
  //       ...bidderBid.bidder
  //     }
  //   })
  // }


}
export const ticketsService = new TicketsService()
import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { towerEventsService } from './TowerEventsService'

class TicketsService {

  async getAccountTickets(query) {
    const accountTickets = await dbContext.Tickets.find(query).populate('towerEvent')
    return accountTickets.map(mongooseDocument => {
      const accountTicket = mongooseDocument.toJSON()
      return {
        eventId: accountTicket.id,
        ...accountTicket.towerEvent
      }
    })
  }

  async getEventTickets(eventId) {
    const ticketHolders = await dbContext.Tickets.find(eventId).populate('attendee', 'name picture')
    return ticketHolders.map(mongooseDocument => {
      const ticketHolder = mongooseDocument.toJSON()
      return {
        eventId: ticketHolder.id,
        ...ticketHolder.attendee
      }
    })

  }

  async createTicket(ticket) {
    const towerEvent = await towerEventsService.getOne(ticket.eventId)
    if (towerEvent.capacity <= 0) {
      throw new BadRequest('No more room at this event')
    }
    const newTicket = await dbContext.Tickets.create(ticket)
    towerEvent.capacity--
    await towerEvent.save()
    await newTicket.save()
    this.getAccountTickets(newTicket.accountId)//FIXME this line might not be working 
    this.getEventTickets(newTicket.eventId)
    return newTicket
  }

  async deleteTicket(userId, ticketId, ticketBody) {
    if (userId != ticketBody.accountId) {
      throw new BadRequest('thats not yo ticket')
    }
    await dbContext.Tickets.findByIdAndDelete(ticketId)
  }
}



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



export const ticketsService = new TicketsService()
package com.api.dto.ticket;

import com.api.entities.tickets.Ticket;

public class TicketDtoBuilder {
    
    public static TicketDto createTicketDto(Ticket ticket) {
         TicketDto ticketDto = new TicketDto();

         ticketDto.setId(ticket.getId());
         ticketDto.setOwner(ticket.getOwner());
         ticketDto.setPrice(ticket.getPrice());

         return ticketDto;
    }
}

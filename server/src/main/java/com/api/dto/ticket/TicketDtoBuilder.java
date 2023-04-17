package com.api.dto.ticket;

import com.api.entities.tickets.Ticket;

public class TicketDtoBuilder {
    
    public static TicketDto createTicketDto(Ticket ticket) {
         TicketDto ticketDto = new TicketDto();
         ticketDto.setId(ticket.getId());
         ticketDto.setOwner(ticket.getOwner());
         ticketDto.setPrice(ticket.getPrice());
         ticketDto.setRoomName(ticket.getPlace().getRoom().getName());
         ticketDto.setPlace(ticket.getPlace().getId());
         ticketDto.setDescription(ticket.getEvent().getDescription());
         ticketDto.setPlaceType(ticket.getPlace().getPlaceType());
         ticketDto.setEvent(ticket.getEvent());

         return ticketDto;
    }
}

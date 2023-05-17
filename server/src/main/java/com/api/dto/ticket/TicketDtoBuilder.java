package com.api.dto.ticket;

import com.api.dto.artist.ArtistDto;
import com.api.entities.attachments.Attachment;
import com.api.entities.tickets.Ticket;

import java.util.stream.Collectors;

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
         ticketDto.setPosition(ticket.getPlace().getPosition());
         ticketDto.setArtists(ticket.getEvent().getArtists().stream().map(x -> {
              ArtistDto artistDto = new ArtistDto();
              artistDto.setName(x.getName());
              return artistDto;
         }).collect(Collectors.toList()));
         if(ticket.getEvent().getImages().size() > 0) {
              ticketDto.setMainImageUrl(ticket.getEvent().getImages().get(0).getImageURL());
         } else {
              ticketDto.setMainImageUrl("defaultUrl");
         }
         return ticketDto;
    }
}

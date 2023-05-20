package com.api.services.ticket;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.api.dao.EventDao;
import com.api.dao.RoomDao;
import com.api.dao.UserDao;
import com.api.dto.ticket.RequestCreateTicketDto;
import com.api.entities.accounts.User;
import com.api.entities.events.Event;
import com.api.entities.venue.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.dao.TicketDao;
import com.api.dto.ticket.TicketDto;
import com.api.dto.ticket.TicketDtoBuilder;
import com.api.entities.tickets.Ticket;

@Service
public class TicketService {
    @Autowired
    private TicketDao ticketDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EventDao eventDao;

    @Autowired
    private RoomDao roomDao;


    public List<TicketDto> getTickets(String username) {
        List<Ticket> tickets = ticketDao.getUserTickets(username);

        if(tickets != null) {
            return tickets.stream().map(TicketDtoBuilder::createTicketDto)
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public TicketDto getTicket(Integer id) {
        Ticket ticket = ticketDao.getTicket(id);

        return TicketDtoBuilder.createTicketDto(ticket);
    }

    public void createTicket(RequestCreateTicketDto dto) {
        User user = userDao.getUserByUsername(dto.getUsername());
        Event event = eventDao.getEvent(dto.getEventId());
        Place place = roomDao.getPlace(dto.getPlace());
        ticketDao.persistTicket(getCreatedTicket(user, event, place));
        place.setOccupated(true);
        roomDao.merge(place);
    }

    private Ticket getCreatedTicket(User user, Event event, Place place) {
        Ticket ticket = new Ticket();
        ticket.setEvent(event);
        ticket.setOwner(user);
        ticket.setPrice(event.getPrice());
        ticket.setPlace(place);

        return ticket;
    }
}

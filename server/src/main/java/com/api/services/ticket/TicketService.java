package com.api.services.ticket;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
}

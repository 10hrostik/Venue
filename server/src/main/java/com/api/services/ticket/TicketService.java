package com.api.services.ticket;

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

    public List<TicketDto> getTickets(Integer ownerId) {
        List<Ticket> tickets = ticketDao.getUserTickets(ownerId);

        return tickets.stream().map(x -> TicketDtoBuilder.createTicketDto(x))
               .collect(Collectors.toList());
    }
}

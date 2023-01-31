package api.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.dao.TicketDao;
import api.dto.ticket.TicketDto;
import api.dto.ticket.TicketDtoBuilder;
import api.entities.tickets.Ticket;

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

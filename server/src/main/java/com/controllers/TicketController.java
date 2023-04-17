package com.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.dto.ticket.TicketDto;
import com.api.services.ticket.TicketService;

@RestController
@CrossOrigin
@RequestMapping("/api/secured/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;
    
    @GetMapping(value = "/mytickets/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TicketDto> getUserTickets(@PathVariable(value = "username") String username) {
        return ticketService.getTickets(username);
    }

}

package com.controllers;

import java.util.List;

import com.api.dto.BatchResponseDto;
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
    
    @GetMapping(value = "/myTickets/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TicketDto> getUserTickets(@PathVariable(value = "username") String username) {
        return ticketService.getTickets(username);
    }

    @GetMapping(value = "/myTicket/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<TicketDto> getUserTicket(@PathVariable(value = "id") int id) {
        BatchResponseDto<TicketDto> response = new BatchResponseDto<>();
        response.setData(ticketService.getTicket(id));
        response.setMessage("Fetched Successfully!");

        return response;
    }
}

package com.controllers;

import java.util.List;

import com.api.dto.BatchResponseDto;
import com.api.dto.ticket.RequestCreateTicketDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createTicket(@RequestBody RequestCreateTicketDto requestDto) {
        try{
            ticketService.createTicket(requestDto);
            String okStatus = "Created Successfully";

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(okStatus);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

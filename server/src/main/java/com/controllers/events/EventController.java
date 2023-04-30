package com.controllers.events;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.FullEventDto;
import com.api.dto.event.CreateEventDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.api.services.event.GeneralEventService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/public/events")
public class EventController {
    
    @Autowired
    private GeneralEventService eventService;



}

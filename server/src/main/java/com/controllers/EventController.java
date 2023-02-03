package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.services.EventServic;

@CrossOrigin
@RestController
@RequestMapping("api/secured/events")
public class EventController {
    
    @Autowired
    private EventServic eventService;
}

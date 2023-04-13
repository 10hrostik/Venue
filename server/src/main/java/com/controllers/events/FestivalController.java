package com.controllers.events;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.event.SearchCriteriaDto;
import com.api.services.event.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/public/festivals")
public class FestivalController {

    @Autowired
    @Qualifier("FestivalService")
    private EventService eventService;

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<List<EventResponseDto>> getFestivals() {
        BatchResponseDto<List<EventResponseDto>> response = new BatchResponseDto<>();
        response.setData(eventService.getEvents());

        if (response.getData() != null) {
            response.setMessage("Found " + response.getData().size());
            return response;
        } else {
            throw new NullPointerException("No events found");
        }
    }

    @GetMapping(value = "/get/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<DetailedEventResponseDto> getFestival(@PathVariable String name) {
        BatchResponseDto<DetailedEventResponseDto> response = new BatchResponseDto<>();
        response.setData(eventService.getEvent());

        if (response.getData() != null) {
            response.setMessage("Found " + response.getData().getName());
            return response;
        } else {
            throw new NullPointerException("No event found");
        }
    }

    @PostMapping(value = "/get", produces = MediaType.APPLICATION_JSON_VALUE
                                  , consumes = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<List<EventResponseDto>> getFilteredFestivals(@RequestBody SearchCriteriaDto searchCriteria){
        BatchResponseDto<List<EventResponseDto>> response = new BatchResponseDto<>();
        response.setData(eventService.getEvents(searchCriteria));

        if (response.getData() != null) {
            response.setMessage("Found " + response.getData().size());
            return response;
        } else {
            throw new NullPointerException("No events found");
        }
    }
}

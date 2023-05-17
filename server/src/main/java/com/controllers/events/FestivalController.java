package com.controllers.events;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.services.event.EventService;
import com.controllers.events.utils.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static com.controllers.events.utils.ResponseBuilder.getDetailedEventResponseDtoBatchResponseDto;
import static com.controllers.events.utils.ResponseBuilder.getListBatchResponseDto;

@RestController
@CrossOrigin
@RequestMapping("api/public/festival")
public class FestivalController {

    @Autowired
    @Qualifier("FestivalService")
    private EventService eventService;

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<List<EventResponseDto>> getFestivals() {
        return getListBatchResponseDto(eventService);
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<DetailedEventResponseDto> getFestival(@PathVariable int id) {
        return getDetailedEventResponseDtoBatchResponseDto(id, eventService);
    }

    @GetMapping(value = "/get/recent", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<List<DetailedEventResponseDto>> getMostRecentFestivals() {
        BatchResponseDto<List<DetailedEventResponseDto>> response = new BatchResponseDto<>();
        response.setData(eventService.getMostRecentEvents());
        response.setMessage("Found " + response.getData().size());

        return response;
    }
}

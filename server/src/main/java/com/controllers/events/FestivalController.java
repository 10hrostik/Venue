package com.controllers.events;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.services.event.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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

}

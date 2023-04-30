package com.controllers.events;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.services.event.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import static com.controllers.events.utils.ResponseBuilder.getListBatchResponseDto;

@RestController
@CrossOrigin
@RequestMapping("api/public/concert")
public class ConcertController {
    @Autowired
    @Qualifier("ConcertService")
    private EventService eventService;

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<List<EventResponseDto>> getConcerts() {
        return getListBatchResponseDto(eventService);
    }
}

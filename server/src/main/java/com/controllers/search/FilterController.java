package com.controllers.search;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.search.SearchCriteriaDto;
import com.api.entities.events.Genre;
import com.api.services.event.GeneralEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/public/filter")
public class FilterController {
    @Autowired
    private GeneralEventService eventService;

    @GetMapping(value = "/get/{eventType}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Genre> getGenres(@PathVariable(value = "eventType", required = false) String objectType) {
         return Genre.getGenres(objectType);
    }

    @PostMapping(value = "/criteria", consumes = MediaType.APPLICATION_JSON_VALUE
                                    , produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<List<EventResponseDto>> findByCriteria(@RequestBody SearchCriteriaDto searchCriteriaDto) {
        BatchResponseDto<List<EventResponseDto>> response = new BatchResponseDto<>();
        response.setData(eventService.getByCriteria(searchCriteriaDto));

        if (response.getData() != null) {
            response.setMessage("Found " + response.getData().size());
            return response;
        } else {
            throw new NullPointerException("No events found");
        }
    }
}

package com.controllers.events.utils;

import com.api.dto.BatchResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.services.event.EventService;

import java.util.List;

public interface ResponseBuilder {
    static BatchResponseDto<List<EventResponseDto>> getListBatchResponseDto(EventService eventService) {
        BatchResponseDto<List<EventResponseDto>> response = new BatchResponseDto<>();
        response.setData(eventService.getEvents());

        if (response.getData() != null) {
            response.setMessage("Found " + response.getData().size());
            return response;
        } else {
            throw new NullPointerException("No events found");
        }
    }
}

package com.api.services.event;

import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.event.SearchCriteriaDto;

import java.util.List;

public interface EventService {
    List<EventResponseDto> getEvents();
    List<EventResponseDto> getEvents(SearchCriteriaDto criteriaDto);
    DetailedEventResponseDto getEvent();
    Object createEvent();
    Object updateEvent();
    Object deleteEvent();
}

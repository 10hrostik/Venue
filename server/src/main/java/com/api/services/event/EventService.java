package com.api.services.event;

import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;

import java.util.List;

public interface EventService {
    List<EventResponseDto> getEvents();
    DetailedEventResponseDto getEvent(Integer id);
    List<DetailedEventResponseDto> getMostRecentEvents();
    Object createEvent();
    Object updateEvent();
    Object deleteEvent();
}

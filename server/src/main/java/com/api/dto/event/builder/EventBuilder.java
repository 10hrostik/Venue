package com.api.dto.event.builder;

import com.api.dto.event.EventResponseDto;
import com.api.dto.event.FullEventDto;
import com.api.entities.events.Event;

public interface EventBuilder {

    static FullEventDto buildFullDto(Event event) {
        FullEventDto target = new FullEventDto();
        if (event != null) {
            target.setId(event.getId());
            target.setArtists(event.getArtists());
            target.setDate(event.getDate());
            target.setDescription(event.getDescription());
            target.setGenre(event.getGenre());
            target.setPrice(event.getPrice());
            target.setEventType(event.getEventType());
            target.setTickets(event.getTickets());
        }

        return target;
    }

    static EventResponseDto buildEventResponseDto(Event event) {
        EventResponseDto target = new EventResponseDto();
        if (event != null) {
            target.setDate(event.getDate());
            target.setGenre(event.getGenre());
            target.setEventType(event.getEventType());
            target.setName(event.getName());
            target.setPrice(event.getPrice());
        }

        return target;
    }
}

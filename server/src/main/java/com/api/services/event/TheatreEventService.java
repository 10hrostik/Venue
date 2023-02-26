package com.api.services.event;

import com.api.dao.EventDao;
import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.event.SearchCriteriaDto;
import com.api.dto.event.builder.EventBuilder;
import com.api.entities.events.EventType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("TheatreService")
public class TheatreEventService implements EventService{

    @Autowired
    private EventDao dao;

    private final EventType eventType = EventType.THEATRE_PLAY;

    @Override
    public List<EventResponseDto> getEvents() {
        return dao.getSpecific(eventType).stream()
                .map(EventBuilder::buildEventResponseDto).collect(Collectors.toList());
    }

    @Override
    public List<EventResponseDto> getEvents(SearchCriteriaDto criteriaDto) {
        List<EventResponseDto> events = dao.getSpecific(eventType).stream()
                .map(EventBuilder::buildEventResponseDto).toList();

        return events.stream().filter(x -> criteriaDto.getName() != null
                        || x.getName().equals(criteriaDto.getName()))
                .filter(x -> x.getDate().compareTo(criteriaDto.getFirstDate()) >= 0)
                .filter(x -> x.getDate().compareTo(criteriaDto.getLastDate()) <= 0)
                .filter(x -> x.getPrice() > criteriaDto.getFirstPrice()
                        && x.getPrice() < criteriaDto.getEndPrice()).collect(Collectors.toList());
    }

    @Override
    public DetailedEventResponseDto getEvent() {
        return null;
    }

    @Override
    public Object createEvent() {
        return null;
    }

    @Override
    public Object updateEvent() {
        return null;
    }

    @Override
    public Object deleteEvent() {
        return null;
    }
}

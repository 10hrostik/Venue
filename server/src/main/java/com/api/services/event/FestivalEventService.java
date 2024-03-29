package com.api.services.event;

import com.api.dao.EventDao;
import com.api.dto.artist.ArtistDto;
import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.event.builder.EventBuilder;
import com.api.entities.attachments.Attachment;
import com.api.entities.events.Event;
import com.api.entities.events.EventType;
import com.api.entities.venue.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("FestivalService")
public class FestivalEventService implements EventService{
    @Autowired
    private EventDao dao;

    private final EventType eventType = EventType.FESTIVAL;

    @Override
    public List<EventResponseDto> getEvents() {
        return dao.getSpecific(eventType).stream()
                .map(EventBuilder::buildEventResponseDto).collect(Collectors.toList());
    }

    @Override
    public DetailedEventResponseDto getEvent(Integer id) {
        Event event = dao.getEvent(id);
        return EventBuilder.getDetailedDto(event);
    }

    @Override
    public List<DetailedEventResponseDto> getMostRecentEvents() {
        List<Event> events = dao.getMostRecent(eventType);

        return events.stream().map(EventBuilder::getDetailedDto).toList();
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

    private void setImageUrl(List<Event> events, List<DetailedEventResponseDto> dtos) {
        for(int i = 0; i < events.size(); i++) {
            dtos.get(i).setImageUrl(events.get(i).getImages().get(0).getImageURL());
        }
    }
}

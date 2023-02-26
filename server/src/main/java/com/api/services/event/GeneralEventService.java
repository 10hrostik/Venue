package com.api.services.event;

import com.api.dao.EventDao;
import com.api.dao.TicketDao;
import com.api.dto.event.CreateEventDto;
import com.api.dto.event.FullEventDto;
import com.api.dto.event.builder.EventBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeneralEventService {

    @Autowired
    private EventDao eventDao;

    @Autowired
    private TicketDao ticketDao;

    public List<FullEventDto> getAllEvents() {
        return eventDao.getAll().stream().map(EventBuilder::buildFullDto).collect(Collectors.toList());
    }

    public void createEvent(CreateEventDto dto) {

    }
}

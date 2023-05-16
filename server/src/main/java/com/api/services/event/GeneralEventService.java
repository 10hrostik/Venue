package com.api.services.event;

import com.api.dao.EventDao;
import com.api.dao.TicketDao;
import com.api.dto.event.CreateEventDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.event.FullEventDto;
import com.api.dto.event.builder.EventBuilder;
import com.api.dto.search.SearchCriteriaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
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

    public List<EventResponseDto> getByCriteria(SearchCriteriaDto dto) {
        validateDto(dto);
        List<EventResponseDto> events = eventDao.getSpecific(dto.getEventType()).stream()
                .map(EventBuilder::buildEventResponseDto).toList();

        return events.stream().filter(x -> {
                  if(dto.getSearchText().length() > 0) {
                      return x.getName().toLowerCase().contains(dto.getSearchText().toLowerCase());
                  } else {
                    return true;
                  }
                 })
                .filter(x -> x.getDate().compareTo(dto.getFirstDate()) >= 0)
                .filter(x -> {
                    if(dto.getLastDate().equals(Date.valueOf(LocalDate.MAX))) {
                        return true;
                    } else {
                        return x.getDate().compareTo(dto.getLastDate()) <= 0;
                    }
                })
                .filter(x -> x.getPrice() >= dto.getFirstPrice())
                .filter(x -> x.getPrice() <= dto.getLastPrice())
                .filter(x -> {
                    if(dto.getGenres().size() > 0) {
                        return dto.getGenres().contains(x.getGenre());
                    } else {
                        return true;
                    }
                }).collect(Collectors.toList());
    }

    private void validateDto(SearchCriteriaDto dto) {
        if(dto.getFirstDate().compareTo(dto.getLastDate()) > 0
                && !dto.getLastDate().equals(Date.valueOf(LocalDate.MAX))) {
            throw new IllegalArgumentException("Incorrect date input");
        }
        if(dto.getFirstPrice() > dto.getLastPrice()) {
            throw new IllegalArgumentException("Incorrect price input");
        }
    }
}

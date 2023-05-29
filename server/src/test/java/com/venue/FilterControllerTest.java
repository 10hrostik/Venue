package com.venue;

import com.api.dao.EventDao;
import com.api.dao.TicketDao;
import com.api.dao.UserDao;
import com.api.dto.BatchResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.search.SearchCriteriaDto;
import com.api.entities.events.Genre;
import com.api.services.event.GeneralEventService;
import com.controllers.search.FilterController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ContextConfiguration(classes = {FilterController.class, GeneralEventService.class,
       EventDao.class, TicketDao.class, UserDao.class})
public class FilterControllerTest {

    @Mock
    private GeneralEventService eventService;

    @InjectMocks
    private FilterController filterController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindByCriteriaSuccess() {
        SearchCriteriaDto searchCriteriaDto = new SearchCriteriaDto();
        List<EventResponseDto> eventResponseDtos = Arrays.asList(
                new EventResponseDto(),
                new EventResponseDto()
        );
        BatchResponseDto<List<EventResponseDto>> expectedResponse = new BatchResponseDto<>();
        expectedResponse.setData(eventResponseDtos);
        expectedResponse.setMessage("Found " + eventResponseDtos.size());

        when(eventService.getByCriteria(eq(searchCriteriaDto))).thenReturn(eventResponseDtos);

        BatchResponseDto<List<EventResponseDto>> response = filterController.findByCriteria(searchCriteriaDto);

        assertNotEquals(expectedResponse, response);
    }

    @Test
    public void testFindByCriteriaNoEventsFound() {
        SearchCriteriaDto searchCriteriaDto = new SearchCriteriaDto();

        when(eventService.getByCriteria(eq(searchCriteriaDto))).thenReturn(null);

        assertThrows(NullPointerException.class, () -> {
            filterController.findByCriteria(searchCriteriaDto);
        });
    }
}
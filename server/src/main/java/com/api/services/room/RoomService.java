package com.api.services.room;

import com.api.dao.RoomDao;
import com.api.dto.place.PlaceDto;
import com.api.dto.place.PlaceResponseDto;
import com.api.entities.events.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomDao roomDao;


    public PlaceResponseDto getResponseDto(Integer eventId) {
        PlaceResponseDto responseDto = new PlaceResponseDto();
        Event event = roomDao.getPlaces(eventId);
        responseDto.setPlaces(event.getPlaces().stream()
                .map(x -> new PlaceDto(x.getId(), x.getPosition(), x.getOccupated(), x.getPlaceType()))
                .toList());
        responseDto.setRoomId(event.getRoom().getId());

        return responseDto;
    }
}

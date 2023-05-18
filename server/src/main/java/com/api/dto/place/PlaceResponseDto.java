package com.api.dto.place;

import java.util.List;

public class PlaceResponseDto {
    private List<PlaceDto> places;
    private Integer roomId;

    public List<PlaceDto> getPlaces() {
        return places;
    }

    public void setPlaces(List<PlaceDto> places) {
        this.places = places;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }
}

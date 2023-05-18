package com.api.dto.place;

import com.api.entities.venue.PlaceType;

public class PlaceDto {
    private Integer id;
    private Integer place;
    private Boolean occupied;

    private PlaceType placeType;

    public PlaceDto() {

    }

    public PlaceDto(Integer id, Integer place, Boolean occupied, PlaceType placeType) {
        this.id = id;
        this.place = place;
        this.occupied = occupied;
        this.placeType = placeType;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPlace(Integer placeId) {
        this.place = placeId;
    }

    public void setOccupied(Boolean occupied) {
        this.occupied = occupied;
    }

    public void setPlaceType(PlaceType placeType) {
        this.placeType = placeType;
    }

    public Integer getId() {
        return this.id;
    }

    public Integer getPlace() {
        return this.place;
    }

    public PlaceType getPlaceType() {
        return this.placeType;
    }

    public Boolean getOccupied() {
        return this.occupied;
    }
 }

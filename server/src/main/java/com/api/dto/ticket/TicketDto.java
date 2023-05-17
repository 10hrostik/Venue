package com.api.dto.ticket;

import com.api.dto.artist.ArtistDto;
import com.api.entities.accounts.User;
import com.api.entities.events.Event;
import com.api.entities.venue.PlaceType;

import java.util.List;

public class TicketDto {

    private Integer id;

    private User owner;

    private Integer price;

    private String description;

    private Integer place;

    private String roomName;

    private PlaceType placeType;

    private String mainImageUrl;

    private List<ArtistDto> artists;

    private Integer position;

    public List<ArtistDto> getArtists() {
        return artists;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public void setArtists(List<ArtistDto> artists) {
        this.artists = artists;
    }

    public String getMainImageUrl() {
        return mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    private Event event;

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Integer getPlace() {
        return place;
    }

    public void setPlace(Integer place) {
        this.place = place;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public PlaceType getPlaceType() {
        return placeType;
    }

    public void setPlaceType(PlaceType placeType) {
        this.placeType = placeType;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId(){
        return this.id;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getOwner() {
        return this.owner;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPrice() {
        return this.price;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return this.description;
    }
    
}

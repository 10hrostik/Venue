package com.api.dto.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RequestCreateTicketDto {
    @JsonProperty("username")
    private String username;
    @JsonProperty("eventId")
    private Integer eventId;
    @JsonProperty("placeId")
    private Integer place;

    public Integer getPlace() {
        return place;
    }

    public void setPlace(Integer place) {
        this.place = place;
    }

    public String getUsername() {
        return username;
    }

    public void setUserId(String username) {
        this.username = username;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }
}

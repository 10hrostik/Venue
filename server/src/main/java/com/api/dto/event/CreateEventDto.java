package com.api.dto.event;

import com.api.dto.artist.ArtistDto;
import com.api.entities.events.EventType;
import com.api.entities.events.Genre;
import com.api.entities.tickets.Ticket;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Set;

public class CreateEventDto {
    @NotNull
    private Integer price;
    @NotNull
    private String name;
    @NotNull
    private Genre genre;
    @NotNull
    private EventType eventType;
    @NotNull
    private List<ArtistDto> artist;
    @NotNull
    private Integer tickerCount;

    public List<ArtistDto> getArtist() {
        return artist;
    }

    public void setArtist(List<ArtistDto> artist) {
        this.artist = artist;
    }

    public Integer getTickerCount() {
        return tickerCount;
    }

    public void setTickerCount(Integer tickerCount) {
        this.tickerCount = tickerCount;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

}

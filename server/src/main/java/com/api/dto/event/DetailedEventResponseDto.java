package com.api.dto.event;

import com.api.dto.artist.ArtistDto;

import java.util.List;

public class DetailedEventResponseDto extends EventResponseDto {
    private String description;
    private List<ArtistDto> artists;
    private Integer ticketCount;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ArtistDto> getArtists() {
        return artists;
    }

    public void setArtists(List<ArtistDto> artists) {
        this.artists = artists;
    }

    public Integer getTicketCount() {
        return ticketCount;
    }

    public void setTicketCount(Integer ticketCount) {
        this.ticketCount = ticketCount;
    }
}

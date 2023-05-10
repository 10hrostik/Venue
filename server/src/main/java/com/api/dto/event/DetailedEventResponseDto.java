package com.api.dto.event;

import com.api.dto.artist.ArtistDto;

import java.util.List;

public class DetailedEventResponseDto extends EventResponseDto {
    public static class RoomDto {
        private String name;
        private Integer placeCount;
        private Integer freePlaces;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getPlaceCount() {
            return placeCount;
        }

        public void setPlaceCount(Integer placeCount) {
            this.placeCount = placeCount;
        }

        public Integer getFreePlaces() {
            return freePlaces;
        }

        public void setFreePlaces(Integer freePlaces) {
            this.freePlaces = freePlaces;
        }
    }

    private String description;
    private List<ArtistDto> artists;
    private RoomDto room;
    private List<String> images;

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public RoomDto getRoom() {
        return room;
    }

    public void setRoom(RoomDto room) {
        this.room = room;
    }

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
}

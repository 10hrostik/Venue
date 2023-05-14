package com.api.dto.event.builder;

import com.api.dto.artist.ArtistDto;
import com.api.dto.event.DetailedEventResponseDto;
import com.api.dto.event.EventResponseDto;
import com.api.dto.event.FullEventDto;
import com.api.entities.attachments.Attachment;
import com.api.entities.events.Event;
import com.api.entities.venue.Place;
import com.config.ImagePath;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Value;

import java.util.stream.Collectors;

public interface EventBuilder {

    static FullEventDto buildFullDto(Event event) {
        FullEventDto target = new FullEventDto();
        if (event != null) {
            target.setId(event.getId());
            target.setArtists(event.getArtists());
            target.setDate(event.getDate());
            target.setDescription(event.getDescription());
            target.setGenre(event.getGenre());
            target.setPrice(event.getPrice());
            target.setEventType(event.getEventType());
            target.setTickets(event.getTickets());
            target.setCity(event.getCity());
            target.setVenue(event.getVenue());
            target.setAdress(event.getAdress());
        }

        return target;
    }

    static EventResponseDto buildEventResponseDto(Event event) {
        EventResponseDto target = new EventResponseDto();
        if (event != null) {
            target.setId(event.getId());
            target.setDate(event.getDate());
            target.setGenre(event.getGenre());
            target.setEventType(event.getEventType());
            target.setName(event.getName());
            target.setPrice(event.getPrice());
            target.setCity(event.getCity());
            target.setAdress(event.getAdress());
            target.setImageUrl(event.getImages().size() == 0 ? "no-photo.jpg" : event.getImages().get(0).getImageURL());
            target.setFreeTickets(event.getRoom().getPlacecount() - event.getPlaces().stream()
                    .filter(Place::getOccupated).map(x -> 1).reduce(0, Integer::sum));
        }

        return target;
    }

    static DetailedEventResponseDto getDetailedDto(Event event) {
        DetailedEventResponseDto dto = new DetailedEventResponseDto();

        dto.setDescription(event.getDescription());
        dto.setPrice(event.getPrice());
        dto.setDate(event.getDate());
        dto.setAdress(event.getAdress());
        dto.setCity(event.getCity());
        dto.setVenue(event.getVenue());
        dto.setArtists(event.getArtists().stream().map(x -> {
            ArtistDto artistDto = new ArtistDto();
            artistDto.setName(x.getName());
            return artistDto;
        }).collect(Collectors.toList()));
        dto.setFreeTickets(event.getRoom().getPlacecount() - event.getPlaces().stream()
                .filter(Place::getOccupated).map(x -> 1).reduce(0, Integer::sum));
        dto.setGenre(event.getGenre());
        dto.setName(event.getName());
        DetailedEventResponseDto.RoomDto roomDto = new DetailedEventResponseDto.RoomDto();
        roomDto.setName(event.getRoom().getName());
        roomDto.setPlaceCount(event.getRoom().getPlacecount());
        dto.setRoom(roomDto);
        if(event.getImages().size() > 0) {
            dto.setImages(event.getImages().stream().map(Attachment::getImageURL).collect(Collectors.toList()));
            dto.setImageUrl(dto.getImages().get(0));
        }

        return dto;
    }
}

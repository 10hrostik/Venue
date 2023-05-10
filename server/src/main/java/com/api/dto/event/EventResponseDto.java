package com.api.dto.event;

import com.api.entities.events.EventType;
import com.api.entities.events.Genre;

import java.sql.Date;
import java.util.List;

public class EventResponseDto {
    private Integer id;
    private String name;
    private EventType eventType;
    private Genre genre;
    private Date date;
    private Integer price;
    private String city;
    private String venue;
    private String adress;
    private String imageUrl;
    private Integer freeTickets;

    public Integer getFreeTickets() {
        return freeTickets;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public void setFreeTickets(Integer freeTickets) {
        this.freeTickets = freeTickets;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
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

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

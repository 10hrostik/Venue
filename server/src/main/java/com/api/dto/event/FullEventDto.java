package com.api.dto.event;

import com.api.entities.artirts.Artist;
import com.api.entities.events.EventType;
import com.api.entities.events.Genre;
import com.api.entities.tickets.Ticket;

import java.sql.Date;
import java.util.List;
import java.util.Set;

public class FullEventDto {

    private Integer id;

    private Integer price;

    private Date date;

    private String description;

    private Genre genre;

    private EventType eventType;

    private Set<Ticket> tickets;

    private List<Artist> artists;

    private String city;

    private String adress;

    private String venue;

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

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public List<Artist> getArtists() {
        return artists;
    }

    public void setArtists(List<Artist> artists) {
        this.artists = artists;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPrice() {
        return this.price;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public EventType getEventType() {
        return this.eventType;
    }

    public Genre getGenre() {
        return this.genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }

    public Set<Ticket> getTickets() {
        return this.tickets;
    }
}

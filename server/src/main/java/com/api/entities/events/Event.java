package com.api.entities.events;

import java.sql.Date;
import java.util.List;
import java.util.Set;

import com.api.entities.attachments.Attachment;
import com.api.entities.artirts.Artist;
import com.api.entities.venue.Place;
import com.api.entities.venue.Room;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import com.api.entities.tickets.Ticket;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
 
    @Column(name = "price")
    private Integer price;

    @Column(name = "event_date")
    private Date date;

    @Column(name = "description")
    private String description;

    @Column(name = "genre")
    @Enumerated(EnumType.STRING)
    private Genre genre;

    @Column(name = "city")
    private String city;

    @Column(name = "adress")
    private String adress;

    @Column(name = "venue")
    private String venue;

    @Column(name = "event_name")
    private String name;
    
    @Column(name = "event_type")
    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    private Set<Ticket> tickets;

    @JsonIgnore
    @OneToMany(mappedBy = "eventId", fetch = FetchType.EAGER)
    private List<Artist> artists;

    @JsonIgnore
    @OneToMany(mappedBy = "event", fetch = FetchType.EAGER)
    private List<Attachment> images;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @JsonIgnore
    @OneToMany(mappedBy = "event", fetch = FetchType.EAGER)
    private List<Place> places;

    public Room getRoom() {
        return room;
    }

    public List<Place> getPlaces() {
        return places;
    }

    public void setPlaces(List<Place> places) {
        this.places = places;
    }

    public void setRoom(Room room) {
        this.room = room;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Attachment> getImages() {
        return images;
    }

    public void setImages(List<Attachment> images) {
        this.images = images;
    }
}

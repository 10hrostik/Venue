package com.api.entities.venue;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "freeplaces")
    private Integer freeplaces;

    @Column(name = "placecount")
    private Integer placecount;

    @JsonIgnore
    @OneToMany(mappedBy = "place")
    private List<Place> places;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFreeplaces() {
        return freeplaces;
    }

    public void setFreeplaces(Integer freeplaces) {
        this.freeplaces = freeplaces;
    }

    public Integer getPlacecount() {
        return placecount;
    }

    public void setPlacecount(Integer placecount) {
        this.placecount = placecount;
    }

    public List<Place> getPlaces() {
        return places;
    }

    public void setPlaces(List<Place> places) {
        this.places = places;
    }
}

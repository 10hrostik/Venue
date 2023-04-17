package com.api.entities.venue;

import com.api.entities.tickets.Ticket;
import jakarta.persistence.*;

@Entity
@Table(name = "places")
public class Place {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "occupated", nullable = false)
    private Boolean occupated;

    @Column(name = "place_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

    @OneToOne(mappedBy = "place")
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getOccupated() {
        return occupated;
    }

    public void setOccupated(Boolean occupated) {
        this.occupated = occupated;
    }

    public PlaceType getPlaceType() {
        return placeType;
    }

    public void setPlaceType(PlaceType placeType) {
        this.placeType = placeType;
    }
}

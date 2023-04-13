package com.api.entities.attachments;

import com.api.entities.events.Event;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "images")
public class Attachment implements Serializable {
    @Id
    private Integer id;

    @Column(name = "imageURL")
    private String imageURL;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Event event;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}

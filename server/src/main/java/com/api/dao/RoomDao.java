package com.api.dao;

import com.api.entities.events.Event;
import com.api.entities.venue.Place;
import com.config.EntityManagerConfig;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomDao {
    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public Event getPlaces(Integer eventId) {
        return em.find(Event.class, eventId);
    }

    public Place getPlace(Integer id) {
        return em.find(Place.class, id);
    }

    public void merge(Place place) {
        EntityTransaction et = em.getTransaction();
        if (!et.isActive()) {
            et.begin();
        }
        em.merge(place);
        et.commit();
    }
}

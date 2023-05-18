package com.api.dao;

import com.api.entities.events.Event;
import com.api.entities.venue.Place;
import com.config.EntityManagerConfig;
import jakarta.persistence.EntityManager;
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
}

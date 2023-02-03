package com.api.dao;

import jakarta.persistence.EntityManager;

import com.api.entities.events.Event;
import org.springframework.stereotype.Component;
import com.config.EntityManagerConfig;

@Component
public class EventDao {

    private EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public void save(Event event) {
        em.getTransaction().begin();
        em.persist(event);
        em.getTransaction().commit();
    }
}

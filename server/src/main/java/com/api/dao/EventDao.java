package com.api.dao;

import com.api.entities.events.EventType;
import jakarta.persistence.EntityManager;

import com.api.entities.events.Event;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import org.springframework.stereotype.Component;
import com.config.EntityManagerConfig;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class EventDao {

    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public void save(Event event) {
        em.getTransaction().begin();
        em.persist(event);
        em.getTransaction().commit();
    }

    public List<Event> getAll() {
        try {
            Query query = em.createQuery("SELECT c FROM Event c");

            return castList(Event.class, query.getResultList());
        } catch (NoResultException | IllegalStateException exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public List<Event> getSpecific(EventType eventType) {
        try {
            Query query = em.createQuery("SELECT c FROM Event c " +
                    "WHERE c.eventType = '" + eventType.toString() + "'");

            return castList(Event.class, query.getResultList());
        } catch (NoResultException | IllegalStateException exception) {
            exception.printStackTrace();
            return null;
        }
    }

    private <T> List<T> castList(Class<? extends T> entityClass, Collection<?> collection) {
        List<T> list = new ArrayList<T>(collection.size());
        for(Object object: collection)
            list.add(entityClass.cast(object));
        return list;
    }
}

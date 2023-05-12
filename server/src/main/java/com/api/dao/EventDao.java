package com.api.dao;

import com.api.dto.search.SearchCriteriaDto;
import com.api.entities.events.EventType;
import jakarta.persistence.EntityManager;

import com.api.entities.events.Event;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import com.config.EntityManagerConfig;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
@Scope("prototype")
public class EventDao {

    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public void save(Event event) {
        em.getTransaction().begin();
        em.persist(event);
        em.getTransaction().commit();
        syncDatabase();
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

    public Event getEvent(Integer id) {
        return em.find(Event.class, id);
    }

    public List<Event> getSpecific(EventType eventType) {
        try {
            Query query = em.createQuery("SELECT c FROM Event c " +
                    "WHERE c.eventType = '" + eventType.toString() + "'");

            return castList(Event.class, query.getResultList());
        } catch (NoResultException | IllegalStateException exception) {
            exception.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<Event> getByCriteria(SearchCriteriaDto dto) {
        try {
            Query query = em.createQuery("SELECT c FROM Event c " +
                    "WHERE c.price > '" + dto.getFirstPrice() + "' AND c.price < '" + dto.getLastPrice() + "' AND " +
                    " c.name = '" + dto.getSearchText() + "'");

            return castList(Event.class, query.getResultList());
        } catch (NoResultException | IllegalStateException exception) {
            exception.printStackTrace();
            return new ArrayList<>();
        }
    }

    private <T> List<T> castList(Class<? extends T> entityClass, Collection<?> collection) {
        List<T> list = new ArrayList<T>(collection.size());
        for(Object object: collection)
            list.add(entityClass.cast(object));
        return list;
    }

    private void syncDatabase() {
        em.getTransaction().begin();
        em.flush();
        em.getTransaction().commit();
    }
}

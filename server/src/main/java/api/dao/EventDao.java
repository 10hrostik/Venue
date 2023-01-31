package api.dao;

import javax.persistence.EntityManager;
import org.springframework.stereotype.Component;
import api.configs.EntityManagerConfig;
import api.entities.events.Event;

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

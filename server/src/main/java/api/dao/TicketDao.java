package api.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Component;

import api.configs.EntityManagerConfig;
import api.entities.accounts.User;
import api.entities.tickets.Ticket;

@Component
public class TicketDao {
    private EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public List<Ticket> getUserTickets(Integer userId) {
        User target = em.find(User.class, userId);

        if (target != null) {
            return target.getTickets();
        } else {
            return new ArrayList<>();
        }
    }
}

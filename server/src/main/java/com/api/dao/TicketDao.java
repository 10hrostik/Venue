package com.api.dao;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;

import com.api.entities.accounts.User;
import com.api.entities.tickets.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.config.EntityManagerConfig;

@Component
public class TicketDao {
    @Autowired
    private UserDao userDao;

    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public List<Ticket> getUserTickets(String username) {
        User target = userDao.getUserByUsername(username);
        if (target != null) {
            return target.getTickets();
        } else {
            return new ArrayList<>();
        }
    }

    public Ticket getTicket(Integer id) {
        return em.find(Ticket.class, id);
    }
}

package com.api.dao;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;

import com.api.entities.accounts.User;
import com.api.entities.tickets.Ticket;
import org.springframework.stereotype.Component;

import com.config.EntityManagerConfig;

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

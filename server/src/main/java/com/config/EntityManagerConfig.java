package com.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class EntityManagerConfig {
    
    public static EntityManager getEntityManagerFactory() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory( "Venue" );

        return emf.createEntityManager();
    }
}

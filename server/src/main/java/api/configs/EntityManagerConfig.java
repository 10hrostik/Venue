package api.configs;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerConfig {
    
    public static EntityManager getEntityManagerFactory() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory( "Venue" );
	    EntityManager entityManager = emf.createEntityManager();

        return entityManager;
    }
}

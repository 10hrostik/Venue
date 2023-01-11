package api.dao;

import org.springframework.stereotype.Component;

import api.configs.EntityManagerConfig;
import api.entities.accounts.User;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

@Component
public class UserDao {
    private EntityManager em;

    public User getUser(String username, String password) throws NoResultException {
        try {
            em = EntityManagerConfig.getEntityManagerFactory();
            Query query = em.createQuery("SELECT c FROM User c WHERE c.username = '" + username 
                                    + "' AND c.password = '" + password + "'");
            return (User) query.getSingleResult();
        } catch (NoResultException exception) {
            exception.printStackTrace();
            return null;
        }      
    }

    public void save(User user) {
        em = EntityManagerConfig.getEntityManagerFactory();
        em.persist(user);
        em.getTransaction().begin();
        em.getTransaction().commit();
    }

    public User getUserByUsername(String username) {
        try {
            em = EntityManagerConfig.getEntityManagerFactory();
            Query query = em.createQuery("SELECT c FROM User c WHERE c.username = '" + username 
                                    + "'");
            return (User) query.getSingleResult();
        } catch (NoResultException exception) {
            exception.printStackTrace();
            return null;
        }  
    }
}

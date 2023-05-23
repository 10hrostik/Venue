package com.api.dao;

import com.api.entities.accounts.User;
import com.api.entities.accounts.UserBuilder;
import com.api.entities.accounts.UserSettings;
import org.springframework.stereotype.Component;

import com.config.EntityManagerConfig;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

@Component
public class UserDao {
    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public User getUser(String username, String password) throws NoResultException {
        try {
            em.clear();
            Query query = em.createQuery("SELECT c FROM User c WHERE c.username = '" + username 
                                    + "' AND c.password = '" + password + "'");

            return (User) query.getSingleResult();
        } catch (NoResultException exception) {
            throw new NoResultException("Invalid username or password");
        }      
    }

    public void save(User user) {
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        syncDatabase();
    }

    public User getUserById(Integer id) {
        return em.find(User.class, id);
    }
    public User getUserByUsername(String username) {
        try{
            em.clear();
            Query query = em.createQuery("SELECT c FROM User c WHERE c.username = '" + username
                    + "'");
            return (User) query.getSingleResult();
        } catch (NoResultException exception) {
            return null;
        }
    }

    public List<User> getAllUsers() {
        try {
            Query query = em.createQuery("SELECT c FROM User c");

            return castList(User.class, query.getResultList());
        } catch (NoResultException | IllegalStateException exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public void editUser(User user) {
        em.getTransaction().begin();
        em.merge(user);
        em.getTransaction().commit();
        syncDatabase();
    }

    public String delete(String username) {
        try {
            em.getTransaction().begin();
            Query query = em.createQuery("DELETE FROM User WHERE username = " + username);
            query.executeUpdate();
            em.getTransaction().commit();
            syncDatabase();

            return "Successful";
        } catch(Exception exception) {
            exception.printStackTrace();
            em.getTransaction().rollback();
            return "Something went wrong!";
        }
    }

    private void syncDatabase() {
        em.getTransaction().begin();
        em.flush();
        em.getTransaction().commit();
    }

    private <T> List<T> castList(Class<? extends T> entityClass, Collection<?> collection) {
        List<T> list = new ArrayList<T>(collection.size());
        for(Object object: collection)
          list.add(entityClass.cast(object));
        return list;
    }
}

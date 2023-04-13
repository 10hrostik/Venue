package com.api.dao;

import com.api.entities.accounts.User;
import com.api.entities.accounts.UserBuilder;
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
    private EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public User getUser(String username, String password) throws NoResultException {
        try {
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
    }

    public User getUserByUsername(String username) {
        Query query = em.createQuery("SELECT c FROM User c WHERE c.username = '" + username
                                + "'");
        return (User) query.getSingleResult();
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
    }

    public String delete(Integer id) {
        try {
            em = EntityManagerConfig.getEntityManagerFactory();
            em.getTransaction().begin();
            Query query = em.createQuery("DELETE FROM User WHERE id = " + id.intValue());
            query.executeUpdate();
            em.getTransaction().commit();

            return "Successful";
        } catch(Exception exception) {
            exception.printStackTrace();
            return "Something went wrong!";
        }
    }

    private <T> List<T> castList(Class<? extends T> entityClass, Collection<?> collection) {
        List<T> list = new ArrayList<T>(collection.size());
        for(Object object: collection)
          list.add(entityClass.cast(object));
        return list;
    }

    private User changeEntity(User target, User source) {
        if (source.getEmail() != null) {
            target.setEmail(source.getEmail());
        }
        if (source.getPhone() != null) {
            target.setPhone(source.getPhone());
        }
        if (source.getPassword() != null) {
            target.setPassword(source.getPassword());
        }

        return target;
    } 
}

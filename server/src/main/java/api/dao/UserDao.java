package api.dao;

import java.util.List;
import org.springframework.stereotype.Component;

import api.configs.EntityManagerConfig;
import api.dto.user.RegisterUserDto;
import api.entities.accounts.User;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

@Component
public class UserDao {
    private List<User> users;
    private EntityManager em;

    public List<User> getUsers() {
        return users;
    }

    public User getUserById(int id) {
        em.getTransaction().begin();
        User foundUser = em.find(User.class, id);
        em.close();
        return foundUser;
    }

    public void save(RegisterUserDto user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setUsername(user.getUserName());
        em = EntityManagerConfig.getEntityManagerFactory();
        em.persist(newUser);
        em.getTransaction().begin();
        em.getTransaction().commit();
    }

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

    public User edit(User user, EntityManager em) {
         return null;   
    }
}

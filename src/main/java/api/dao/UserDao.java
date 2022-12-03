package api.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import api.beans.User;

@Component
public class UserDao {
    private List<User> users;

    {
        users = new ArrayList<>();
        users.add(new User(1, "rostikUser", "horban", "Rostik"));
        users.add(new User(2, "anyaUser", "horban", "Anya"));
    }

    public List<User> getUsers() {
        return users;
    }

    public User getUserById(Long id) {
        return users.stream().filter(user -> user.getId() == id).findAny().orElse(null);
    }

    public void save(User user) {
        user.setId(3);
        users.add(user);
    }

    public User getUser(String username, String password) {
        return users.stream().filter(user -> user.getUsername().equals(username))
                .filter(user -> user.getPassword().equals(password)).findAny().orElse(null);
    }
}

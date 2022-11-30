package api.dao;

import java.util.ArrayList;
import java.util.List;
import api.beans.User;

public class UserDao {
    private List<User> users;

    {
        users = new ArrayList<>();
        users.add(new User(1l, "rostikUser", "horban", "Rostik"));
        users.add(new User(2L, "anyaUser", "horban", "Anya"));
    }

    public List<User> getUsers() {
        return users;
    }

    public User getUserById(Long id) {
        return users.stream().filter(user -> user.getId() == id).findAny().orElse(null);
    }
}

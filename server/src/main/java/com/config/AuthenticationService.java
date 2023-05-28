package com.config;

import com.api.dao.UserDao;
import com.api.entities.accounts.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    public List<User> getAll() {
        return this.userDao.getAllUsers();
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException, DataAccessException {
        User user = userDao.getUserByUsername(username);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("No user with username '"
                    + username + "' found!");
        }
    }
}
package com.api.services.user;

import com.api.dto.user.*;
import com.config.EntityManagerConfig;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.dao.UserDao;
import com.api.dto.user.builder.UserDtoBuilder;
import com.api.entities.accounts.User;
import com.api.entities.accounts.UserBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    private final EntityManager em;

    {
        em = EntityManagerConfig.getEntityManagerFactory();
    }

    public ResponseUserDto save(RegisterUserDto user) throws Exception {
        User newUser = UserBuilder.getRegisteredUser(user);
        if (userDao.getUserByUsername(user.getUsername()) == null) {
            userDao.save(newUser);
            return UserDtoBuilder.getRegisteredUser(user);
        } else {
            throw new Exception("Username is already in use");
        }
    }

    public ResponseUserDto edit(EditUserDto user) {
        User foundUser = userDao.getUserByUsername(user.getRootUsername());
        em.detach(foundUser);
        editUser(user, foundUser);
        ResponseUserDto result = UserDtoBuilder.getEditedUser(foundUser);
        userDao.editUser(foundUser);

        return result;
    }

    public ResponseUserDto editPassword(RequestEditPasswordDto user) {
        User foundUser = userDao.getUserByUsername(user.getUsername());
        em.detach(foundUser);
        editPassword(user, foundUser);
        ResponseUserDto result = UserDtoBuilder.getEditedUser(foundUser);
        userDao.editUser(foundUser);

        return result;
    }

    public ResponseUserDto getUser(String username, String password) {
        User user = userDao.getUser(username, password);
        return UserDtoBuilder.getLogginedUser(user);
    }

    public List<FullUserDto> getAllUsers() {
        List<User> users = userDao.getAllUsers();
     
        return users.stream().map(UserDtoBuilder::getFullUser).collect(Collectors.toList());
    }

    public String delete(String username) {
        return userDao.delete(username);
    }

    private void editUser(EditUserDto dto, User user) {
        user.setUsername(dto.getUsername());
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
    }

    private void editPassword(RequestEditPasswordDto dto, User user) {
         user.setPassword(dto.getPassword());
    }
}

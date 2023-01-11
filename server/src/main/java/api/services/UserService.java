package api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import api.dao.UserDao;
import api.dto.user.RegisterUserDto;
import api.dto.user.UserDto;
import api.dto.user.builder.UserDtoBuilder;
import api.entities.accounts.User;
import api.entities.accounts.UserBuilder;

import javax.persistence.EntityManager;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public UserDto save(RegisterUserDto user, BindingResult bindingResult) {       
        User newUser = UserBuilder.getRegisteredUser(user);
        if (userDao.getUserByUsername(user.getUserName()) == null) {
            userDao.save(newUser);
            return UserDtoBuilder.getRegisteredUser(user);
        } else {
            return null;
        }
    }

    public User edit(User user, EntityManager em) {
         return null;   
    }

    public UserDto getUser(String username, String password) {
        User user = userDao.getUser(username, password);
        return UserDtoBuilder.getLogginedUser(user);
    }

}

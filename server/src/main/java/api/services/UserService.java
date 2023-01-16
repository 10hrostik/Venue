package api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.dao.UserDao;
import api.dto.user.EditUserDto;
import api.dto.user.FullUserDto;
import api.dto.user.RegisterUserDto;
import api.dto.user.ResponseUserDto;
import api.dto.user.builder.UserDtoBuilder;
import api.entities.accounts.User;
import api.entities.accounts.UserBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public ResponseUserDto save(RegisterUserDto user) {       
        User newUser = UserBuilder.getRegisteredUser(user);
        if (userDao.getUserByUsername(user.getUsername()) == null) {
            userDao.save(newUser);
            return UserDtoBuilder.getRegisteredUser(user);
        } else {
            return null;
        }
    }

    public ResponseUserDto edit(EditUserDto user) {
        User editUser = UserBuilder.getEditedUser(user);
        editUser = userDao.editUser(editUser);
        ResponseUserDto result = UserDtoBuilder.getEditedUser(editUser);

        return result;
    }

    public ResponseUserDto getUser(String username, String password) {
        User user = userDao.getUser(username, password);
        return UserDtoBuilder.getLogginedUser(user);
    }

    public List<FullUserDto> getAllUsers() {
        List<User> users = userDao.getAllUsers();
     
        return users.stream().map(x -> UserDtoBuilder.getFullUser(x)).collect(Collectors.toList());
    }

    public String delete(Integer id) {
        return userDao.delete(id);
    }

}

package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import api.dao.UserDao;
import api.dto.BatchResponseDto;
import api.dto.user.EditUserDto;
import api.dto.user.RegisterUserDto;
import api.entities.accounts.User;

@RestController
@CrossOrigin
@RequestMapping("/api/secured")
public class UserController {
    @Autowired
    private UserDao userDao;

    private final String INVALID_CREDENTIALS = "Username or password is incorrect!";

    private final String VALID_CREDENTIALS = "Username or password is correct!";
    
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE
                                    , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public BatchResponseDto<User> register(@RequestBody RegisterUserDto client) {
        userDao.save(client);
        BatchResponseDto<User> response = login(client.getUserName(), client.getPassword());
        return response;
    }

    @GetMapping(value = "/login/{username}/{password}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public BatchResponseDto<User> login(@PathVariable(value = "username") String username, 
    @PathVariable(value = "password") String password) {
        BatchResponseDto<User> response = new BatchResponseDto<>(); 
        User user = userDao.getUser(username, password);
        if (user == null) {
            response.setMessage(INVALID_CREDENTIALS);
        } else {
            response.setData(user);
            response.setMessage(VALID_CREDENTIALS);
        }

        return response;
    }
    
    @PatchMapping(value = "/edit" , produces = MediaType.APPLICATION_JSON_VALUE 
                                  ,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public User edit(@RequestBody EditUserDto editUserDto) {
         System.out.println(editUserDto.getUserName());
         return new User();
    }
}

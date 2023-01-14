package controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import api.dto.BatchResponseDto;
import api.dto.user.EditUserDto;
import api.dto.user.RegisterUserDto;
import api.dto.user.UserDto;
import api.entities.accounts.User;
import api.services.UserService;
import api.services.ValidationService;

@RestController
@CrossOrigin
@RequestMapping("/api/secured/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private ValidationService validationService;

    private final String INVALID_CREDENTIALS = "Username or password is incorrect!";

    private final String VALID_CREDENTIALS = "Username and password are correct!";

    private final String INVALID_FORM = "Username is already in use";
    
    @ResponseBody
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE
                                    , produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<UserDto> register(@RequestBody @Valid RegisterUserDto client, 
                                               BindingResult bindingResult) {
        BatchResponseDto<UserDto> response = new BatchResponseDto<>(); 
        if (validationService.getErrorMessages(bindingResult.getAllErrors()).length() > 1) {
            response.setMessage(validationService.getErrorMessages(bindingResult.getAllErrors()));
        } else {
            UserDto user = userService.save(client, bindingResult);
            if (user == null) { 
                response.setMessage(INVALID_FORM);
            } else {
                response.setData(user);
                response.setMessage(VALID_CREDENTIALS);
            }
        }

        return response;
    }

    @ResponseBody
    @GetMapping(value = "/login/{username}/{password}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<UserDto> login(@PathVariable(value = "username") String username, 
                                           @PathVariable(value = "password") String password) {
        BatchResponseDto<UserDto> response = new BatchResponseDto<>(); 
        UserDto user = userService.getUser(username, password);
        if (user == null) {
            response.setMessage(INVALID_CREDENTIALS);
        } else {
            response.setData(user);
            response.setMessage(VALID_CREDENTIALS);
        }

        return response;
    }
    
    @ResponseBody
    @PatchMapping(value = "/edit" , produces = MediaType.APPLICATION_JSON_VALUE 
                                  , consumes = MediaType.APPLICATION_JSON_VALUE)
    public User edit(@RequestBody EditUserDto editUserDto) {
         System.out.println(editUserDto.getUserName());
         return new User();
    }

    @ResponseBody
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE) 
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }
}

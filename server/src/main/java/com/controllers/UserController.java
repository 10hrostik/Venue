package com.controllers;

import java.util.List;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.dto.BatchResponseDto;
import com.api.dto.user.EditUserDto;
import com.api.dto.user.FullUserDto;
import com.api.dto.user.RegisterUserDto;
import com.api.dto.user.ResponseUserDto;
import com.api.services.UserService;
import com.api.services.ValidationService;

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

    private final String CHANGED_ACCOUNT = "Your account is updated successfully!";
    
    @ResponseBody
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE
                                    , produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<ResponseUserDto> register(@RequestBody @Valid RegisterUserDto client, 
                                               BindingResult bindingResult) {
        BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>(); 
        if (validationService.getErrorMessages(bindingResult.getAllErrors()).length() > 1) {
            response.setMessage(validationService.getErrorMessages(bindingResult.getAllErrors()));
        } else {
            ResponseUserDto user = userService.save(client);
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
    public BatchResponseDto<ResponseUserDto> login(@PathVariable(value = "username") String username, 
                                           @PathVariable(value = "password") String password) {
         BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>(); 
        ResponseUserDto user = userService.getUser(username, password);
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
    public BatchResponseDto<ResponseUserDto> edit(@RequestBody @Valid EditUserDto editUserDto, BindingResult bindingResult) {
        BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>(); 
        if (validationService.getErrorMessages(bindingResult.getAllErrors()).length() > 1) {
            response.setMessage(validationService.getErrorMessages(bindingResult.getAllErrors()));
        } else {
            ResponseUserDto user = userService.edit(editUserDto);
            response.setData(user);
            response.setMessage(CHANGED_ACCOUNT);
        }

        return response;
    }

    @ResponseBody
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE) 
    public List<FullUserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @ResponseBody
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public String delete(@PathVariable(value = "id") Integer id) {
           String response = userService.delete(id);
           return response;
    }
}

package com.controllers;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.api.dto.user.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
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
import com.api.services.user.UserService;
import com.api.services.ValidationService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private ValidationService validationService;

    private final String INVALID_CREDENTIALS = "Username or password is incorrect!";

    private final String VALID_CREDENTIALS = "Username and password are correct!";

    private final String INVALID_FORM = "Username is already in use";

    private final String CHANGED_ACCOUNT = "Your account is updated successfully!";

    @PostMapping(value = "/api/public/users/register", consumes = MediaType.APPLICATION_JSON_VALUE
                                       , produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<ResponseUserDto> register(@RequestBody @Valid RegisterUserDto client, 
                                                      BindingResult bindingResult, HttpServletRequest request) throws Exception {
        BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>(); 
        if (validationService.getErrorMessages(bindingResult.getAllErrors()).length() > 1) {
            response.setMessage(validationService.getErrorMessages(bindingResult.getAllErrors()));
        } else {
            ResponseUserDto user = userService.save(client);
            if (user == null) { 
                response.setMessage(INVALID_FORM);
            } else {
                response.setData(user);
                request.login(user.getUsername(), client.getPassword());
                response.setMessage(VALID_CREDENTIALS);
            }
        }

        return response;
    }

    @GetMapping(value = "/api/public/users/login/{username}/{password}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<ResponseUserDto> login(@PathVariable(value = "username") String username,
                                                   @PathVariable(value = "password") String password, HttpServletRequest request) throws ServletException {
        BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>();
        ResponseUserDto user = userService.getUser(username, password);
        if (user == null) {
            response.setMessage(INVALID_CREDENTIALS);
        } else {
            request.login(username, password);
            response.setData(user);
            response.setMessage(VALID_CREDENTIALS);
        }

        return response;
    }

    @PatchMapping(value = "/api/secured/users/edit" , produces = MediaType.APPLICATION_JSON_VALUE
                                     , consumes = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<ResponseUserDto> edit(@RequestBody @Valid EditUserDto editUserDto, BindingResult bindingResult) {
        BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>();
        String error = validationService.getErrorMessages(bindingResult.getAllErrors());
        if (error.length() > 1 && !error.contains("Password")) {
            response.setMessage(validationService.getErrorMessages(bindingResult.getAllErrors()));
        } else {
            ResponseUserDto user = userService.edit(editUserDto);
            response.setData(user);
            response.setMessage(CHANGED_ACCOUNT);
        }

        return response;
    }

    @PatchMapping(value = "/api/secured/users/editpassword", consumes = MediaType.APPLICATION_JSON_VALUE,
                                                                 produces = MediaType.APPLICATION_JSON_VALUE)
    public BatchResponseDto<ResponseUserDto> edit(@RequestBody @Valid RequestEditPasswordDto editDto, BindingResult bindingResult) {
        BatchResponseDto<ResponseUserDto> response = new BatchResponseDto<>();
        if (validationService.getErrorMessages(bindingResult.getAllErrors()).length() > 1) {
            response.setMessage(validationService.getErrorMessages(bindingResult.getAllErrors()));
        } else {
            ResponseUserDto user = userService.editPassword(editDto);
            response.setData(user);
            response.setMessage(CHANGED_ACCOUNT);
        }

        return response;
    }

    @GetMapping(value = "/api/secured/users/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FullUserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping(value = "/api/secured/users/delete/", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> delete(@RequestBody String username) {
        Map<String, String> response = new HashMap<>();
        response.put("status", userService.delete(username));
        return response;
    }
}

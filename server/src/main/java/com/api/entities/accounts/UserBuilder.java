package com.api.entities.accounts;

import com.api.dto.user.EditUserDto;
import com.api.dto.user.RegisterUserDto;

public interface UserBuilder {
    public static User getRegisteredUser(RegisterUserDto dto){
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());

        return user;
    }
}

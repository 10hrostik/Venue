package com.api.entities.accounts;

import com.api.dto.user.EditUserDto;
import com.api.dto.user.RegisterUserDto;

import java.util.HashSet;
import java.util.Set;

public interface UserBuilder {
    static User getRegisteredUser(RegisterUserDto dto){
        User user = new User();
        Set<Role> roles = new HashSet<>();
        roles.add(Role.USER);
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setEnabled(true);
        user.setRoles(roles);

        return user;
    }
}

package com.api.dto.user.builder;

import com.api.dto.user.FullUserDto;
import com.api.dto.user.RegisterUserDto;
import com.api.dto.user.ResponseUserDto;
import com.api.dto.user.UserSettingsDto;
import com.api.entities.accounts.User;

public interface UserDtoBuilder {
    static ResponseUserDto getRegisteredUser(RegisterUserDto dto){
            ResponseUserDto user = new ResponseUserDto();
            user.setUsername(dto.getUsername());
            user.setPassword(dto.getPassword());
            user.setEmail(dto.getEmail());
            user.setUserSettings(new UserSettingsDto());

            return user;
    }

    static ResponseUserDto getLogginedUser(User user) {
        ResponseUserDto userDto =  setBasicCredential(user); setBasicCredential(user);
        userDto.setUserSettings(new UserSettingsDto(user.getUserSettings()
                .getFestivalSettings(),
                user.getUserSettings().getConcertSettings(),
                user.getUserSettings().getWorkshopSettings(),
                user.getUserSettings().getTheatreSettings()));

        return userDto;
    }

    static FullUserDto getFullUser(User user) {
        FullUserDto userDto = new FullUserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setPhone(user.getPhone());

        return userDto;
    }

    static ResponseUserDto getEditedUser(User user) {
        return setBasicCredential(user);
    }

    static ResponseUserDto setBasicCredential(User user) {
        ResponseUserDto userDto = new ResponseUserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setPhone(user.getPhone());

        return userDto;
    }
}

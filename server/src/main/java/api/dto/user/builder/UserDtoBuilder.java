package api.dto.user.builder;

import api.dto.user.FullUserDto;
import api.dto.user.RegisterUserDto;
import api.dto.user.ResponseUserDto;
import api.entities.accounts.User;

public interface UserDtoBuilder {
    public static ResponseUserDto getRegisteredUser(RegisterUserDto dto){
            ResponseUserDto user = new ResponseUserDto();
            user.setUsername(dto.getUsername());
            user.setPassword(dto.getPassword());
            user.setEmail(dto.getEmail());

            return user;
    }

    public static ResponseUserDto getLogginedUser(User user) {
        ResponseUserDto userDto = new ResponseUserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setPhone(user.getPhone());

        return userDto;
    }

    public static FullUserDto getFullUser(User user) {
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

    public static ResponseUserDto getEditedUser(User user) {
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

package api.dto.user.builder;

import api.dto.user.RegisterUserDto;
import api.dto.user.UserDto;
import api.entities.accounts.User;

public interface UserDtoBuilder {
    public static UserDto getRegisteredUser(RegisterUserDto dto){
            UserDto user = new UserDto();
            user.setUsername(dto.getUserName());
            user.setPassword(dto.getPassword());
            user.setEmail(dto.getEmail());

            return user;
    }

    public static UserDto getLogginedUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setPhone(user.getPhone());

        return userDto;
    }
}

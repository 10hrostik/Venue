package api.entities.accounts;

import api.dto.user.EditUserDto;
import api.dto.user.RegisterUserDto;

public interface UserBuilder {
    public static User getRegisteredUser(RegisterUserDto dto){
        User user = new User();
        user.setUsername(dto.getUserName());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());

        return user;
    }

    public static User getEditedUser(EditUserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());

        return user;
    }
}

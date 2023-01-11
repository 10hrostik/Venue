package api.entities.accounts;

import api.dto.user.RegisterUserDto;

public interface UserBuilder {
    public static User getRegisteredUser(RegisterUserDto dto){
            User user = new User();
            user.setUsername(dto.getUserName());
            user.setPassword(dto.getPassword());
            user.setEmail(dto.getEmail());

            return user;
    }
}

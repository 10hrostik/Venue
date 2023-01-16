package api.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterUserDto extends AbstractUserDto {

    @JsonProperty("email")
    private String email;
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }
}

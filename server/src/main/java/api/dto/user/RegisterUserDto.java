package api.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class RegisterUserDto {
    
    @Size(min = 5, max = 15, message = "Username should be 5 - 15 chars long")
    @NotEmpty(message = "Fill username box")
    @JsonProperty("username")
    private String username;

    @Size(min = 5, max = 15, message = "Password should be 5 - 15 chars long")
    @NotEmpty(message = "Fill password box")
    @JsonProperty("password")
    private String password;

    @JsonProperty("email")
    private String email;
    

    public void setUserName(String userName) {
        this.username = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }
}

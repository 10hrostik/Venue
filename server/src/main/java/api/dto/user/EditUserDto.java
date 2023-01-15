package api.dto.user;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EditUserDto {
 
    @JsonProperty("username")
    private String username;
    
    @Size(min = 5, max = 15, message = "Username should be 5 - 15 chars long")
    @NotEmpty(message = "Fill password box")
    @JsonProperty("password")
    private String password;

    @JsonProperty("email")
    private String email;
    
    @Digits(fraction = 0, integer = 12, message = "Incorrect input")
    @JsonProperty("phoneNumber")
    private Long phone;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }
    
    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Long getPhone(){
        return this.phone;
    }
}


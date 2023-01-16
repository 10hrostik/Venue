package api.dto.user;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class AbstractUserDto {

     @Size(min = 5, max = 15, message = "Username should be 5 - 15 chars long")
     @NotEmpty(message = "Fill username box")
     @JsonProperty("username")
     private String username;
 
     @Size(min = 5, max = 15, message = "Password should be 5 - 15 chars long")
     @NotEmpty(message = "Fill password box")
     @JsonProperty("password")
     private String password;

     public void setUsername(String username) {
        this.username = username;
     }

     public String getUsername() {
        return this.username;
     }

     public void setPassword(String password) {
        this.password = password;
     }

     public String getPassword() {
        return this.password;
     }
}

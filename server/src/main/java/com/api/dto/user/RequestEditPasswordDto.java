package com.api.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class RequestEditPasswordDto {
    @Size(min = 5, max = 15, message = "Username should be 5 - 15 chars long")
    @NotEmpty(message = "Fill username box")
    @JsonProperty("username")
    private String username;

    @Size(min = 5, max = 15, message = "Password should be 5 - 15 chars long")
    @NotEmpty(message = "Fill password box")
    @JsonProperty("password")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

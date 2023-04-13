package com.api.dto.user;

import jakarta.validation.constraints.Digits;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class EditUserDto extends AbstractUserDto {
    @JsonProperty("email")
    private String email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("surname")
    private String surname;

    @Size(min = 5, max = 15, message = "Username should be 5 - 15 chars long")
    @NotEmpty(message = "Fill username box")
    @JsonProperty("rootUsername")
    private String rootUsername;
    
    @Digits(fraction = 0, integer = 12, message = "Incorrect input")
    @JsonProperty("phone")
    private Long phone;

    public void setEmail(String email) {
        this.email = email;
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

    public String getRootUsername() {
        return rootUsername;
    }

    public void setRootUsername(String rootUsername) {
        this.rootUsername = rootUsername;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}


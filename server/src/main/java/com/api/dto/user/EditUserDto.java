package com.api.dto.user;

import jakarta.validation.constraints.Digits;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EditUserDto extends AbstractUserDto {

    @JsonProperty("email")
    private String email;
    
    @Digits(fraction = 0, integer = 12, message = "Incorrect input")
    @JsonProperty("phoneNumber")
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
}


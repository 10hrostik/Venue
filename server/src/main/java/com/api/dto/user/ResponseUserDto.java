package com.api.dto.user;

import com.api.entities.accounts.Role;

import java.util.Set;

public class ResponseUserDto extends AbstractUserDto {
    private String name;

    private String surname;

    private String email;
    
    private Long phone;

    private Set<Role> roles;

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Long getPhone() {
        return phone;
    }

    public String getSurname() {
        return surname;
    }
}

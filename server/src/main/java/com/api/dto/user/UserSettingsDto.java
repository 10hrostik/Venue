package com.api.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserSettingsDto {
    @JsonProperty("username")
    private String username;
    @JsonProperty("festival")
    private String festival;
    @JsonProperty("concert")
    private String concert;
    @JsonProperty("workshop")
    private String workshop;
    @JsonProperty("theatre")
    private String theatre;

    public UserSettingsDto() {

    }
    public UserSettingsDto(String festival, String concert, String workshop, String theatre) {
        this.festival = festival;
        this.concert = concert;
        this.workshop = workshop;
        this.theatre = theatre;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFestival() {
        return festival;
    }

    public void setFestival(String festival) {
        this.festival = festival;
    }

    public String getConcert() {
        return concert;
    }

    public void setConcert(String concert) {
        this.concert = concert;
    }

    public String getWorkshop() {
        return workshop;
    }

    public void setWorkshop(String workshop) {
        this.workshop = workshop;
    }

    public String getTheatre() {
        return theatre;
    }

    public void setTheatre(String theatre) {
        this.theatre = theatre;
    }
}

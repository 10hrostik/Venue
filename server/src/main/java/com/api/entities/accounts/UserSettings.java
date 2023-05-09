package com.api.entities.accounts;

import jakarta.persistence.*;

@Entity
@Table(name = "user_settings")
public class UserSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "festival_settings")
    private String festivalSettings;
    @Column(name = "concert_settings")
    private String concertSettings;
    @Column(name = "theatre_settings")
    private String theatreSettings;
    @Column(name = "workshop_settings")
    private String workshopSettings;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFestivalSettings() {
        return festivalSettings;
    }

    public void setFestivalSettings(String festivalSettings) {
        this.festivalSettings = festivalSettings;
    }

    public String getConcertSettings() {
        return concertSettings;
    }

    public void setConcertSettings(String concertSettings) {
        this.concertSettings = concertSettings;
    }

    public String getTheatreSettings() {
        return theatreSettings;
    }

    public void setTheatreSettings(String theatreSettings) {
        this.theatreSettings = theatreSettings;
    }

    public String getWorkshopSettings() {
        return workshopSettings;
    }

    public void setWorkshopSettings(String workshopSettings) {
        this.workshopSettings = workshopSettings;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

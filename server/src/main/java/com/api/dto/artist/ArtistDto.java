package com.api.dto.artist;

import com.api.entities.events.Event;
import jakarta.validation.constraints.NotNull;


public class ArtistDto {
    @NotNull
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

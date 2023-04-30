package com.api.entities.events;

import java.util.ArrayList;
import java.util.List;

public enum Genre {
    // For festivals and concrets
    Rock,
    Metal,
    Pop,
    Rap,
    Mix,
    Classic,
    
    //Theatre genres

    DRAMMA,
    EXPERIMENTAL,
    FANTASY,
    HISTORICAL,
    MODERN,

    //Workshops branches
    MUSIC,
    IT,
    FINANCIAL_THEME,
    CRYPTOCURRENCY,
    
    //Other
    ROOM_PERFORMANCE,
    EXHIBITION,
    STAND_UP;

    public static List<Genre> getGenres(String objectType) {
        if(objectType.equals(EventType.CONCERT.toString()) || objectType.equals(EventType.FESTIVAL.toString())) {
            return List.of(Genre.Rock, Genre.Pop, Genre.Rap,
                    Genre.Metal, Genre.Mix, Genre.Classic);
        }
        if(objectType.equals(EventType.WORKSHOP.toString())) {
            return List.of(Genre.MUSIC, Genre.IT, Genre.FINANCIAL_THEME,
                    Genre.EXHIBITION, Genre.STAND_UP, Genre.ROOM_PERFORMANCE, Genre.CRYPTOCURRENCY);
        }
        if (objectType.equals(EventType.THEATRE.toString())) {
            return List.of(Genre.DRAMMA, Genre.EXPERIMENTAL, Genre.HISTORICAL,
                    Genre.FANTASY, Genre.MODERN);
        }

        return new ArrayList<>();
    }
}
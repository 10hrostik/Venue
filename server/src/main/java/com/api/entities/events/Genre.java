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
    Other,
    
    //Theatre genres

    Dramma,
    Experimental,
    Fantasy,
    Historical,
    Modern,

    //Workshops branches
    Music,
    It,
    Financial_Theme,
    Training,
    
    //Other
    Room_Performance,
    Exhibition,
    Stand_Up;

    public static List<Genre> getGenres(String objectType) {
        if(objectType.equals(EventType.CONCERT.toString()) || objectType.equals(EventType.FESTIVAL.toString())) {
            return List.of(Genre.Rock, Genre.Pop, Genre.Rap,
                    Genre.Metal, Genre.Mix, Genre.Classic, Genre.Other);
        }
        if(objectType.equals(EventType.WORKSHOP.toString())) {
            return List.of(Genre.Music, Genre.It, Genre.Financial_Theme,
                    Genre.Exhibition, Genre.Stand_Up, Genre.Room_Performance, Genre.Training);
        }
        if (objectType.equals(EventType.THEATRE.toString())) {
            return List.of(Genre.Dramma, Genre.Experimental, Genre.Historical,
                    Genre.Fantasy, Genre.Modern, Genre.Other);
        }

        return new ArrayList<>();
    }
}
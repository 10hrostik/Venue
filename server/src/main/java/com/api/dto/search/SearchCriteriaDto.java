package com.api.dto.search;

import com.api.entities.events.EventType;
import com.api.entities.events.Genre;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class SearchCriteriaDto {
    @JsonProperty("searchText")
    private String searchText = "";
    @JsonProperty("firstPrice")
    private int firstPrice;
    @JsonProperty("lastPrice")
    private int lastPrice = Integer.MAX_VALUE;
    @JsonProperty("firstDate")
    private Date firstDate = Date.valueOf(LocalDate.now());
    @JsonProperty("lastDate")
    private Date lastDate = Date.valueOf(LocalDate.MAX);
    @JsonProperty("genresToSearch")
    private List<Genre> genres = new ArrayList<>();
    @JsonProperty("objectType")
    private EventType eventType;

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public int getFirstPrice() {
        return firstPrice;
    }

    public void setFirstPrice(int firstPrice) {
        this.firstPrice = firstPrice;
    }

    public int getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(int lastPrice) {
        this.lastPrice = lastPrice;
    }

    public Date getFirstDate() {
        return firstDate;
    }

    public void setFirstDate(Date firstDate) {
        this.firstDate = firstDate;
    }

    public Date getLastDate() {
        return lastDate;
    }

    public void setLastDate(Date lastDate) {
        this.lastDate = lastDate;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
}

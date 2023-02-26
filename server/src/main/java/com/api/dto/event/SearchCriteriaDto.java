package com.api.dto.event;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;

public class SearchCriteriaDto {
    @JsonProperty("firstPrice")
    private Integer firstPrice;
    @JsonProperty("lastPrice")
    private Integer endPrice;
    @JsonProperty("firstDate")
    private Date firstDate;
    @JsonProperty("lastDate")
    private Date lastDate;
    @JsonProperty("name")
    private String name;

    public Integer getFirstPrice() {
        return firstPrice;
    }

    public void setFirstPrice(Integer firstPrice) {
        this.firstPrice = firstPrice;
    }

    public Integer getEndPrice() {
        return endPrice;
    }

    public void setEndPrice(Integer endPrice) {
        this.endPrice = endPrice;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

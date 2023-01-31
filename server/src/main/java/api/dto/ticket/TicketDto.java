package api.dto.ticket;

import api.entities.accounts.User;

public class TicketDto {

    private Integer id;

    private User owner;

    private Integer price;

    private String descrition;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId(){
        return this.id;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getOwner() {
        return this.owner;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPrice() {
        return this.price;
    }

    public void setDescription(String description) {
        this.descrition = description;
    }
    
    public String getDescription() {
        return this.descrition;
    }
    
}

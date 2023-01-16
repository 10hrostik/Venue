package api.dto.user;

public class FullUserDto extends ResponseUserDto {

    private Integer id;

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
}

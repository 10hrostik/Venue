package com.api.dto.attachment;

public class AttachmentDto {
    byte[] image;
    String type;

    public AttachmentDto() {
    }

    public AttachmentDto(byte[] image, String type) {
        this.image = image;
        this.type = type;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

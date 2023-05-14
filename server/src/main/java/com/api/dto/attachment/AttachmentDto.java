package com.api.dto.attachment;

public class AttachmentDto {
    byte[] file;
    String type;

    public AttachmentDto() {
    }

    public AttachmentDto(byte[] file, String type) {
        this.file = file;
        this.type = type;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

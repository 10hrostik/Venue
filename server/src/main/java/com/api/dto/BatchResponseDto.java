package com.api.dto;

public class BatchResponseDto <T> {

    private T data;

    private String message;

    public BatchResponseDto() {
        
    }
    
    public BatchResponseDto (T data, String message) {
          this.data = data;
          this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }

    public T getData() { 
        return this.data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage(){
        return this.message;
    }
}

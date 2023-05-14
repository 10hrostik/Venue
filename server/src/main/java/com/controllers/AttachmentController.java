package com.controllers;

import com.api.dto.attachment.AttachmentDto;
import com.api.services.attachment.AttachmentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;

@Controller
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;

    @GetMapping("/upload")
    public String getUploadPage() {
        return "UploadFile";
    }

    @PostMapping("api/secured/upload")
    public String uploadImage(@RequestParam("imageFile") MultipartFile imageFile) {
        if (!imageFile.isEmpty()) {
            attachmentService.saveAttachment(imageFile);
        }
        return "redirect:/";
    }

    @GetMapping("api/public/{filepath}")
    @Transactional
    public ResponseEntity<?> getImage(@PathVariable(value = "filepath") String filepath) throws IOException {
        AttachmentDto imageDto = attachmentService.getImage(filepath);

        if(imageDto.getType().equals("image/png")) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageDto.getImage());
        } else if (imageDto.getType().equals("image/jpeg")) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageDto.getImage());
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_GIF)
                    .body(imageDto.getImage());
        }
    }
}
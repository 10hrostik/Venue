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
        return getResponseEntity(imageDto);
    }

    @GetMapping(value = "api/secured/get/pdf/{id}")
    public ResponseEntity<?> getPdf(@PathVariable(value = "id") Integer id) {
        AttachmentDto pdfFile = attachmentService.getPDF(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfFile.getFile());
    }

    @GetMapping(value = "api/public/aws/{filepath}")
    @Transactional
    public ResponseEntity<?> getAwsImage(@PathVariable(value = "filepath") String filepath) throws IOException {
        AttachmentDto imageDto = attachmentService.getAWSImage(filepath);
        return getResponseEntity(imageDto);
    }

    @GetMapping(value = "api/secured/aws/get/pdf/{id}")
    public ResponseEntity<?> getAwsPdf(@PathVariable(value = "id") Integer id) {
        AttachmentDto pdfFile = attachmentService.getAwsPDF(id);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfFile.getFile());
    }

    private ResponseEntity<?> getResponseEntity(AttachmentDto imageDto) {
        if(imageDto.getType().equals("image/png")) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageDto.getFile());
        } else if (imageDto.getType().equals("image/jpeg")) {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageDto.getFile());
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.IMAGE_GIF)
                    .body(imageDto.getFile());
        }
    }

}
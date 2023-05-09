package com.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;

@Controller
public class UploadController {

    @GetMapping("/upload")
    public String getUploadPage() {
        return "UploadFile";
    }

    @PostMapping("api/secured/upload")
    public String uploadImage(@RequestParam("imageFile") MultipartFile imageFile) {
        if (!imageFile.isEmpty()) {
            try {
                String savePath = "/opt/" + imageFile.getOriginalFilename();
                try (InputStream inputStream = imageFile.getInputStream();
                     FileOutputStream outputStream = new FileOutputStream(savePath)) {
                    int bytesRead;
                    byte[] buffer = new byte[8192];
                    while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "redirect:/";
    }
}
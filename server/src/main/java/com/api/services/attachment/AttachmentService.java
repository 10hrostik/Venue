package com.api.services.attachment;

import com.api.dao.AttachmentDao;
import com.api.dto.attachment.AttachmentDto;
import com.api.entities.attachments.Attachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.List;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentDao attachmentDao;

    private final String folderPath = "/opt/venue/";

    public void saveAttachment(MultipartFile file) {
        try {
            String savePath = folderPath + file.getOriginalFilename();
            try (InputStream inputStream = file.getInputStream();
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

    public AttachmentDto getImage(String filepath) throws IOException {
        List<Attachment> attachmentList = attachmentDao.getAttachment(filepath);
        Attachment attachment = attachmentList.get(0);
        String url = folderPath + attachment.getImageURL();
        byte[] image = Files.readAllBytes(new File(url).toPath());
        return new AttachmentDto(image, attachment.getType());
    }
}

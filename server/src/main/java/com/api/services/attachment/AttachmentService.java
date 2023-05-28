package com.api.services.attachment;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.api.dao.AttachmentDao;
import com.api.dao.TicketDao;
import com.api.dto.attachment.AttachmentDto;
import com.api.entities.attachments.Attachment;

import com.api.entities.tickets.Ticket;
import com.api.entities.venue.PlaceType;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.util.List;
import java.io.IOException;
import com.amazonaws.regions.Region;

import org.apache.pdfbox.pdmodel.PDDocument;

import javax.imageio.ImageIO;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentDao attachmentDao;

    @Autowired
    private TicketDao ticketDao;

    private final AmazonS3 s3;

    {
        s3 = AmazonS3Client.builder().withRegion(Regions.EU_CENTRAL_1).build();
    }

    private final String folderPath = "/opt/venue/";

    private final String BUCKET_NAME = "puppet-attachments";

    private final String PNG = "PNG";

    private final String GIF = "GIF";

    private final String JPEG = "JPEG";

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

    public AttachmentDto getAWSImage(String filepath) throws IOException {
        List<Attachment> attachmentList = attachmentDao.getAttachment(filepath);
        Attachment attachment = attachmentList.get(0);
        S3Object object = s3.getObject(new GetObjectRequest(BUCKET_NAME, attachment.getImageURL()));
        InputStream stream = object.getObjectContent();

        byte[] image = stream.readAllBytes();
        return new AttachmentDto(image, attachment.getType());
    }


    public AttachmentDto getPDF(Integer id) {
        Ticket ticket = ticketDao.getTicket(id);
        try(PDDocument document = new PDDocument()){
            PDDocumentInformation information = new PDDocumentInformation();
            information.setTitle(ticket.getEvent().getName() + " ticket");
            document.setDocumentInformation(information);
            document.addPage(setInfoIntoFile(document, ticket, false));
            document.save(new File(folderPath + document.getDocumentInformation().getTitle() + ".pdf"));
            AttachmentDto attachmentDto = createAttachmentDto(document.getDocumentInformation().getTitle());
            deleteFile(document.getDocumentInformation().getTitle());

            return attachmentDto;
        }catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public AttachmentDto getAwsPDF(Integer id) {
        Ticket ticket = ticketDao.getTicket(id);
        try(PDDocument document = new PDDocument()){
            PDDocumentInformation information = new PDDocumentInformation();
            information.setTitle(ticket.getEvent().getName() + " ticket");
            document.setDocumentInformation(information);
            document.addPage(setInfoIntoFile(document, ticket, true));
            File file = File.createTempFile(information.getTitle(), ".pdf");
            document.save(file);
            AttachmentDto attachmentDto = createAttachmentDto(document.getDocumentInformation().getTitle(), file);
            deleteFile(file);

            return attachmentDto;
        } catch (Exception exception) {
            System.out.println(exception.getMessage() + " " + exception);
            return new AttachmentDto();
        }
    }

    private PDPage setInfoIntoFile(PDDocument document, Ticket ticket, Boolean isAws) throws IOException {
        PDPage page = new PDPage();
        String position = ticket.getPlace().getPlaceType().equals(PlaceType.FUNZONE) ?
                "" :  ticket.getPlace().getPosition().toString();
        PDPageContentStream stream = new PDPageContentStream(document, page);
        PDImageXObject pdImage;
        if (isAws) {
            pdImage = PDImageXObject.createFromByteArray(document,
                    getTransformedAwsImage(ticket.getEvent().getImages().get(0)),
                    ticket.getEvent().getImages().get(0).getName());
        } else {
            pdImage = PDImageXObject.createFromByteArray(document,
                    getTransformedImage(ticket.getEvent().getImages().get(0)),
                    ticket.getEvent().getImages().get(0).getName());
        }
        stream.beginText();
        stream.setFont(PDType1Font.TIMES_BOLD, 19);
        stream.newLineAtOffset(page.getMediaBox().getWidth() / 2 - 50, 700);
        stream.showText("Ticket #" + ticket.getId());
        stream.newLineAtOffset(-(page.getMediaBox().getWidth() / 2 - 75), -25);
        stream.setFont(PDType1Font.TIMES_BOLD, 16);
        stream.showText("Title: " + ticket.getEvent().getName());
        stream.newLineAtOffset(0, -17);
        stream.showText("Date: " + ticket.getEvent().getDate());
        stream.newLineAtOffset(0, -17);
        stream.showText("Price: " + ticket.getPrice());
        stream.newLineAtOffset(0, -17);
        stream.showText("Genre: " + ticket.getEvent().getGenre().toString());
        stream.newLineAtOffset(0, -17);
        stream.showText("Adress: " + ticket.getEvent().getCity() + " " + ticket.getEvent().getAdress());
        stream.newLineAtOffset(0, -17);
        stream.showText("Venue: " + ticket.getEvent().getVenue());
        stream.newLineAtOffset(0, -17);
        stream.showText("Room: " + ticket.getEvent().getRoom().getName());
        stream.newLineAtOffset(0, -17);
        stream.showText("Place: " + ticket.getPlace().getPlaceType() + " " + position);
        stream.endText();
        stream.drawImage(pdImage, (page.getMediaBox().getWidth() / 2 + 75), 520);
        stream.close();

        return page;
    }

    private AttachmentDto createAttachmentDto(String fileName) throws IOException {
        AttachmentDto dto = new AttachmentDto();
        dto.setType("application/pdf");
        dto.setFile(Files.readAllBytes(new File(fileName).toPath()));

        return dto;
    }

    private AttachmentDto createAttachmentDto(String fileName, File file) throws IOException {
        AttachmentDto dto = new AttachmentDto();
        dto.setType("application/pdf");
        dto.setFile(Files.readAllBytes(file.toPath()));

        return dto;
    }

    private void deleteFile(String fileName) {
        File file = new File(folderPath + fileName + ".pdf");
        file.delete();
    }

    private void deleteFile(File file) {
        file.delete();
    }

    private byte[] getTransformedImage(Attachment attachment) throws IOException {
        File file = new File(folderPath + attachment.getImageURL());
        return getBytes(attachment, ImageIO.read(file));
    }

    private byte[] getTransformedAwsImage(Attachment attachment) throws IOException {
        S3Object object = s3.getObject(new GetObjectRequest(BUCKET_NAME, attachment.getImageURL()));
        InputStream stream = object.getObjectContent();
        return getBytes(attachment, ImageIO.read(stream));
    }

    private byte[] getBytes(Attachment attachment, BufferedImage read) throws IOException {
        int newWidth = 195;
        int newHeight = 225;
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Thumbnails.of(read)
                .size(newWidth, newHeight)
                .outputFormat(getExtension(attachment.getImageURL()))
                .outputQuality(1)
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    private String getExtension(String filename) {
        if(filename.toLowerCase().contains(this.GIF.toLowerCase())) {
            return GIF;
        }
        if(filename.toLowerCase().contains(this.PNG.toLowerCase())) {
            return PNG;
        }
        else {
            return JPEG;
        }
    }
}

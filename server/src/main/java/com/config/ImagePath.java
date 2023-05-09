package com.config;

import org.springframework.beans.factory.annotation.Value;

public class ImagePath {
    @Value("${attachments.dir}")
    public static String dir = "C:\\Projects\\Intelij Idea\\Venue\\attachments\\";
}

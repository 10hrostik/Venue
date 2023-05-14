package com.config;

import org.springframework.beans.factory.annotation.Value;

public class ImagePath {
    @Value("${attachments.dir}")
    public static String dir = "/opt/venue/";
}

package com.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class } )
@ComponentScan(basePackages = { "com.controllers",
		"com.api.services", "com.api.dao", "com.config"})
public class VenueApplication {
	public static void main(String[] args) {
		SpringApplication.run(VenueApplication.class, args);
	}
}

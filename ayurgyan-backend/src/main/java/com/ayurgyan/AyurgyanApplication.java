package com.ayurgyan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AyurgyanApplication {

    public static void main(String[] args) {
        SpringApplication.run(AyurgyanApplication.class, args);
    }

    // Remove the CORS config bean from here since we have it in SecurityConfig
}
package com.example.xuanproject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Root {

    @GetMapping("/")
    public String home() {
        return "Backend is working";
    }

}

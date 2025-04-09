package com.example.xuanproject.background.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.background.model.BackgroundService;
import com.example.xuanproject.background.model.BackgroundVO;

@RestController
@RequestMapping("/background")
public class BackgroundController {

    @Autowired
    private BackgroundService backgroundService;

    @GetMapping("/getBackgroundImg")
    public BackgroundVO getBackgroundImg() {
        return backgroundService.getBackImg();
    }

}

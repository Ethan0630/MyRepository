package com.example.xuanproject.background.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

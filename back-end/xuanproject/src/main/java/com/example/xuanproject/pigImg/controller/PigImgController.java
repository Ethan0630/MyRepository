package com.example.xuanproject.pigImg.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.xuanproject.pigImg.model.PigImgDTO;

@RestController
@RequestMapping("/pig")
public class PigImgController {


    // 查詢
    
    @GetMapping("/gif")
    public PigImgDTO getAllGifs() {

        var PigImgDTO = new PigImgDTO();

        PigImgDTO.setPigGif("https://xuan-project-2025.s3.ap-northeast-1.amazonaws.com/project/S__36757508.gif");

        return PigImgDTO;
    }
}

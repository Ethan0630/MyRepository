package com.example.xuanproject.pigImg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.xuanproject.pigImg.model.PigImgService;
import com.example.xuanproject.pigImg.model.PigImgVO;

@RestController
@RequestMapping("/pig")
public class PigImgController {

    @Autowired
    private PigImgService pigImgService;

    // 查詢
    @GetMapping("/gif")
    public ResponseEntity<PigImgVO> getAllGifs() {
        return ResponseEntity.ok(pigImgService.getPigGif());
    }
}

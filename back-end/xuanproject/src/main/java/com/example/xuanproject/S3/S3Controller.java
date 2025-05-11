package com.example.xuanproject.S3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/s3")
public class S3Controller {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "image") String folder) {

        try {
            String url = s3Service.upload(folder, file.getOriginalFilename(), file.getInputStream(), file.getSize(), file.getContentType());
            return ResponseEntity.ok("檔案已上傳成功，URL: " + url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("上傳失敗：" + e.getMessage());
        }
    }
}
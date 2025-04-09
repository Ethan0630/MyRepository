package com.example.xuanproject.banner.controller;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.banner.model.BannerService;
import com.example.xuanproject.banner.model.BannerVO;

@RestController
@RequestMapping("/banner")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    @PutMapping("/admin/upload")
    public BannerVO uploadBanner(
            @RequestParam(value = "banners", required = false) List<MultipartFile> banners) {

        BannerVO bannerVO = new BannerVO();
        bannerVO.setId(1);

        for (int i = 0; i < banners.size(); i++) {
            if (banners.get(i) != null && !banners.get(i).isEmpty()) {
                try {
                    String fieldName = "banner" + (i + 1);
                    Field field = BannerVO.class.getDeclaredField(fieldName);
                    field.setAccessible(true);
                    field.set(bannerVO, banners.get(i).getBytes());
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }

        return bannerService.uploadBanner(bannerVO);

    }

    @GetMapping("/getBanners")
    public List<String> getBanners() {
        return bannerService.getBanners();
    }
}

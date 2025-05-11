package com.example.xuanproject.banner.model;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.S3.S3Service;

@Service("bannerService")
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private S3Service s3Service;

    public boolean uploadBanner( List<MultipartFile> banners, String folder) {

        bannerRepository.deleteAll();
        
        s3Service.deleteFolderObjects(folder);// 刪除整個資料夾的圖片

        var bannerVO = new BannerVO();

        boolean result = true;
            
            if(banners.size() > 0 &&banners.get(0) != null && !banners.get(0).isEmpty()){
                try {
                String url = s3Service.upload(
                    folder,
                    banners.get(0).getOriginalFilename(),
                    banners.get(0).getInputStream(),
                    banners.get(0).getSize(),
                    banners.get(0).getContentType());
                    System.out.println("✅ banner0 URL = " + url);

                bannerVO.setBanner1(url);
                } catch (Exception e) {
                    e.printStackTrace();
                    result = false;
                }
            }

            if(banners.size() > 1 && banners.get(1) != null && !banners.get(1).isEmpty()){
                try {
                String url = s3Service.upload(
                    folder,
                    banners.get(1).getOriginalFilename(),
                    banners.get(1).getInputStream(),
                    banners.get(1).getSize(),
                    banners.get(1).getContentType());
                    System.out.println("✅ banner1 URL = " + url);

                bannerVO.setBanner2(url);
                } catch (Exception e) {
                    e.printStackTrace();
                    result = false;
                }
            }

            if(banners.size() > 2 && banners.get(2) != null && !banners.get(2).isEmpty()){
                try {
                String url = s3Service.upload(
                    folder,
                    banners.get(2).getOriginalFilename(),
                    banners.get(2).getInputStream(),
                    banners.get(2).getSize(),
                    banners.get(2).getContentType());
                    System.out.println("✅ banner2 URL = " + url);

                bannerVO.setBanner3(url);
                } catch (Exception e) {
                    e.printStackTrace();
                    result = false;
                }
            }
        
        bannerVO.setId(1);
        bannerRepository.save(bannerVO);

        return result;
    }

    public List<String> getBanners() {
        BannerVO banner = bannerRepository.findById(1).orElse(new BannerVO());
        List<String> bannersURL = new ArrayList<>();

        if(banner.getBanner1() != null){
            bannersURL.add(banner.getBanner1());
        }
        if(banner.getBanner2() != null){
            bannersURL.add(banner.getBanner2());
        }
        if(banner.getBanner3() != null){
            bannersURL.add(banner.getBanner3());
        }

        return bannersURL; // 回傳 Base64 字串陣列
    }
}

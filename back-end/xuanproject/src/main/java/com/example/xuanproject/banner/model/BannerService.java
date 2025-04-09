package com.example.xuanproject.banner.model;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("bannerService")
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    public BannerVO uploadBanner(BannerVO bannerVO) {

        return bannerRepository.save(bannerVO);

    }

    public List<String> getBanners() {
        BannerVO banner = bannerRepository.findFirstByOrderByIdAsc();
        List<String> banners = new ArrayList<>();

        // 🔍 檢查三張圖是否都為 null
        if (banner == null || banner.getBanner1() == null) {
            return banners;
        }
        banners.add(banner.getBanner1() != null
                ? "data:image/png;base64," + Base64.getEncoder().encodeToString(banner.getBanner1())
                : null);

        banners.add(banner.getBanner2() != null
                ? "data:image/png;base64," + Base64.getEncoder().encodeToString(banner.getBanner2())
                : null);

        banners.add(banner.getBanner3() != null
                ? "data:image/png;base64," + Base64.getEncoder().encodeToString(banner.getBanner3())
                : null);

        return banners; // 回傳 Base64 字串陣列
    }
}

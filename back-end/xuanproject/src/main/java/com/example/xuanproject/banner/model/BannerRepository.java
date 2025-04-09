package com.example.xuanproject.banner.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<BannerVO, Integer> {
    BannerVO findFirstByOrderByIdAsc(); // 找出 ID 最小的那一筆
}

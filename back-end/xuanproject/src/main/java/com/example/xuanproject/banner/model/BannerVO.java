package com.example.xuanproject.banner.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "banner")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
public class BannerVO {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "banner1", length = 512) // 存圖片
    private String banner1;

    @Column(name = "banner2", length = 512) // 存圖片
    private String banner2;

    @Column(name = "banner3", length = 512) // 存圖片
    private String banner3;
}

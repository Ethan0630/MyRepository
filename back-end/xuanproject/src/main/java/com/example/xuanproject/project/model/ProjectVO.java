package com.example.xuanproject.project.model;

import com.example.xuanproject.project.dto.ProjectApiDTO;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "project")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
@AllArgsConstructor // 自動生成帶所有參數的構造函數
public class ProjectVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增主鍵
    private Integer id;

    @Column(name = "name", nullable = false) // 類別，不可為 NULL
    private String name;

    @Column(name = "industry", nullable = false) // 類別，不可為 NULL
    private Integer industry;

    @Column(name = "category", nullable = false) // 類別，不可為 NULL
    private Integer category;

    @Column(name = "image1", length = 512, nullable = false) // 存圖片
    private String image1;

    @Column(name = "image2", length = 512) // 存圖片
    private String image2;

    @Column(name = "image3", length = 512) // 存圖片
    private String image3;

    @Column(name = "image4", length = 512) // 存圖片
    private String image4;

    @Column(name = "image5", length = 512) // 存圖片
    private String image5;

    @Column(length = 255) // 圖片描述，最多 255 字
    private String description;

}

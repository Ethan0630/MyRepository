package com.example.xuanproject.project.model;

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

    @Lob
    @Column(name = "image1", columnDefinition = "LONGBLOB", nullable = false) // 存圖片
    private byte[] image1;

    @Lob
    @Column(name = "image2", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] image2;

    @Lob
    @Column(name = "image3", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] image3;

    @Lob
    @Column(name = "image4", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] image4;

    @Lob
    @Column(name = "image5", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] image5;

    @Column(length = 255) // 圖片描述，最多 255 字
    private String description;

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img1;

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img2;

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img3;

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img4;

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img5;
}

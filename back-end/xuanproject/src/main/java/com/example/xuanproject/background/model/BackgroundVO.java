package com.example.xuanproject.background.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "background")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
@AllArgsConstructor // 自動生成帶所有參數的構造函數
public class BackgroundVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增主鍵
    private Integer id;

    @Lob
    @Column(name = "background_img", columnDefinition = "LONGBLOB", nullable = false) // 類別，不可為 NULL
    private byte[] backgroundImg;

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img1;

}

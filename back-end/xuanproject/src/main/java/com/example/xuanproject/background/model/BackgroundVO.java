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
    private Integer id;

    @Column(name = "background_img",  length = 512) // 類別，不可為 NULL
    private String backgroundImg;

}

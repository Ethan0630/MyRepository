package com.example.xuanproject.industry.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "industry")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
public class IndustryVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增主鍵
    private Integer id;

    @Column(name = "industry_name", nullable = false)
    private String industryName; // 類別名稱
}

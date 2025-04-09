package com.example.xuanproject.category.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "category")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
public class CategoryVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 自增主鍵

    @Column(name = "category_name", nullable = false)
    private String categoryName; // 類別名稱
}

package com.example.xuanproject.banner.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
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

    @Lob
    @Column(name = "banner1", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] banner1;

    @Lob
    @Column(name = "banner2", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] banner2;

    @Lob
    @Column(name = "banner3", columnDefinition = "LONGBLOB") // 存圖片
    private byte[] banner3;
}

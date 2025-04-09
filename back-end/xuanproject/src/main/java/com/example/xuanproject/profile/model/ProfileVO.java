package com.example.xuanproject.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profile")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
public class ProfileVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 主鍵自增
    @Column(name = "id", nullable = false, unique = true)
    private Integer id; // 自增主鍵

    @Lob // 指定為 BLOB（Large Object）
    @Column(name = "profile_pic", columnDefinition = "LONGBLOB")
    private byte[] profilePic; // 存圖片（二進制 BLOB）

    @Column(name = "name", length = 100)
    private String name; // 姓名

    @Column(name = "occupation", length = 100)
    private String occupation; // 職業

    @Column(name = "education", length = 255)
    private String education; // 學歷

    @Column(name = "region", length = 100)
    private String region; // 地區

    @Column(name = "sns_name", length = 50)
    private String snsName; // sns link

    @Column(name = "sns", length = 255)
    private String sns; // sns link

    @Transient // Hibernate 不會將此欄位映射到資料庫
    private String base64Img;

    public ProfileVO(ProfileVO p) {
        this.name = p.name;
        this.occupation = p.occupation;
        this.education = p.education;
        this.region = p.region;
        this.snsName = p.snsName;
        this.sns = p.sns;
    }
}

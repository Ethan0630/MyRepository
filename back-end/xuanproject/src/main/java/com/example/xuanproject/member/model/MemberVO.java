package com.example.xuanproject.member.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Data // Lombok 會自動生成 Getter、Setter、toString()
@NoArgsConstructor // 自動生成無參數構造函數
@AllArgsConstructor // 自動生成帶所有參數的構造函數
public class MemberVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增主鍵
    private Integer id;

    @Column(name = "username", nullable = false) // 類別，不可為 NULL
    private String username;

    @Column(name = "password", nullable = false) // 類別，不可為 NULL
    private String password;

}

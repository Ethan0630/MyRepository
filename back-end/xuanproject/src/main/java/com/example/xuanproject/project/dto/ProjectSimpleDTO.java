package com.example.xuanproject.project.dto;

import lombok.Data;

@Data // ✅ 這個會自動產生 getter，Jackson 就能用來轉 JSON
public class ProjectSimpleDTO {
    private Integer id;
    private String name;

    public ProjectSimpleDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

}

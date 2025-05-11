package com.example.xuanproject.project.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProjectApiDTO {
    private Integer id;
    private String name;
    private Integer industry;
    private Integer category;
    private String description;
    private List<MultipartFile> images;
    
}

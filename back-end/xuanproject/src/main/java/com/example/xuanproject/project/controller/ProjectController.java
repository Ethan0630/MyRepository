package com.example.xuanproject.project.controller;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.project.dto.ProjectSimpleDTO;
import com.example.xuanproject.project.model.ProjectService;
import com.example.xuanproject.project.model.ProjectVO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/getAllName")
    public List<ProjectSimpleDTO> getAllName() {
        return projectService.getAllName();
    }

    @GetMapping("/getProjectById")
    public ProjectVO getProjectById(@RequestParam("id") int id) {
        return projectService.getProjectById(id);
    }

    @GetMapping("/getAllProject")
    public List<ProjectVO> getAllProject() {

        return projectService.getAllProject();
    }

}

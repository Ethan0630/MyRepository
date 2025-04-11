package com.example.xuanproject.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.xuanproject.project.dto.ProjectSimpleDTO;
import com.example.xuanproject.project.model.ProjectService;
import com.example.xuanproject.project.model.ProjectVO;

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

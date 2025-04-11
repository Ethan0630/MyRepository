package com.example.xuanproject.project.model;

import java.util.Base64;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.xuanproject.project.dto.ProjectSimpleDTO;

@Service("picService")
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public boolean savePic(ProjectVO project) {
        try {
            projectRepository.save(project);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<ProjectSimpleDTO> getAllName() {
        return projectRepository.findAllSimpleProjects();
    }

    public ProjectVO getProjectById(Integer id) {
        ProjectVO project = projectRepository.findById(id).orElse(null); // 找不到就回傳 null

        Base64.Encoder encoder = Base64.getEncoder();

        if (project.getImage1() != null) {
            String base64 = encoder.encodeToString(project.getImage1());
            project.setBase64Img1("data:image/jpeg;base64," + base64);
        }
        if (project.getImage2() != null) {
            String base64 = encoder.encodeToString(project.getImage2());
            project.setBase64Img2("data:image/jpeg;base64," + base64);
        }
        if (project.getImage3() != null) {
            String base64 = encoder.encodeToString(project.getImage3());
            project.setBase64Img3("data:image/jpeg;base64," + base64);
        }
        if (project.getImage4() != null) {
            String base64 = encoder.encodeToString(project.getImage4());
            project.setBase64Img4("data:image/jpeg;base64," + base64);
        }
        if (project.getImage5() != null) {
            String base64 = encoder.encodeToString(project.getImage5());
            project.setBase64Img5("data:image/jpeg;base64," + base64);
        }

        return project;
    }

    public boolean deleteProjectById(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        } else {
            return false; // id 不存在
        }
    }

    public List<ProjectVO> getAllProject() {
        List<ProjectVO> ProjectList = projectRepository.findAll();

        Base64.Encoder encoder = Base64.getEncoder();

        for (ProjectVO project : ProjectList) {

            if (project.getImage1() != null) {
                String base64 = encoder.encodeToString(project.getImage1());
                project.setBase64Img1("data:image/jpeg;base64," + base64);
            }
            if (project.getImage2() != null) {
                String base64 = encoder.encodeToString(project.getImage2());
                project.setBase64Img2("data:image/jpeg;base64," + base64);
            }
            if (project.getImage3() != null) {
                String base64 = encoder.encodeToString(project.getImage3());
                project.setBase64Img3("data:image/jpeg;base64," + base64);
            }
            if (project.getImage4() != null) {
                String base64 = encoder.encodeToString(project.getImage4());
                project.setBase64Img4("data:image/jpeg;base64," + base64);
            }
            if (project.getImage5() != null) {
                String base64 = encoder.encodeToString(project.getImage5());
                project.setBase64Img5("data:image/jpeg;base64," + base64);
            }

        }

        // 反轉列表順序：資料庫最後一筆會變成第一筆
        Collections.reverse(ProjectList);

        return ProjectList;
    }
}

package com.example.xuanproject.project.model;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.S3.S3Service;
import com.example.xuanproject.project.dto.ProjectApiDTO;
import com.example.xuanproject.project.dto.ProjectSimpleDTO;

@Service("picService")
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private S3Service s3Service;

    public boolean saveProject(ProjectApiDTO projectApiDTO, String folder) {

        var projectVO = new ProjectVO();
        projectVO.setName(projectApiDTO.getName());
        projectVO.setIndustry(projectApiDTO.getIndustry());
        projectVO.setCategory(projectApiDTO.getCategory());
        projectVO.setDescription(projectApiDTO.getDescription());

        for (int i = 0; i < projectApiDTO.getImages().size(); i++) {
            if (i == 0) {
                projectVO.setImage1(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 1) {
                projectVO.setImage2(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 2) {
                projectVO.setImage3(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 3) {
                projectVO.setImage4(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 4) {
                projectVO.setImage5(urlGen(projectApiDTO.getImages().get(i), folder));
            }
        }

        projectRepository.save(projectVO);

        return true;
    }

    public boolean updateProject(ProjectApiDTO projectApiDTO, String folder) {

        var projectVO = projectRepository.findById(projectApiDTO.getId()).get();

        if (projectVO.getImage1() != null) {
            s3Service.delete(projectVO.getImage1());
        } 
        if (projectVO.getImage2() != null) {
            s3Service.delete(projectVO.getImage2());
        } 
        if (projectVO.getImage3() != null) {
            s3Service.delete(projectVO.getImage3());
        } 
        if (projectVO.getImage4() != null) {
            s3Service.delete(projectVO.getImage4());
        } 
        if (projectVO.getImage5() != null) {
            s3Service.delete(projectVO.getImage5());
        }

        projectVO.setIndustry(projectApiDTO.getIndustry());
        projectVO.setCategory(projectApiDTO.getCategory());
        projectVO.setDescription(projectApiDTO.getDescription());

        for (int i = 0; i < projectApiDTO.getImages().size(); i++) {
            if (i == 0) {
                projectVO.setImage1(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 1) {
                projectVO.setImage2(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 2) {
                projectVO.setImage3(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 3) {
                projectVO.setImage4(urlGen(projectApiDTO.getImages().get(i), folder));
            } else if (i == 4) {
                projectVO.setImage5(urlGen(projectApiDTO.getImages().get(i), folder));
            }
        }

        projectRepository.save(projectVO);

        return true;
    }

    public String urlGen(MultipartFile file, String folder) {
        try {
            String url = s3Service.upload(
                    folder,
                    file.getOriginalFilename(),
                    file.getInputStream(),
                    file.getSize(),
                    file.getContentType());
            return url;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<ProjectSimpleDTO> getAllName() {
        return projectRepository.findAllSimpleProjects();
    }

    public ProjectVO getProjectById(Integer id) {
        ProjectVO project = projectRepository.findById(id).orElse(null); // 找不到就回傳 null

        return project;
    }

    public boolean deleteProjectById(Integer id) {
        if (projectRepository.existsById(id)) {
            ProjectVO projectVO = projectRepository.findById(id).orElse(null); // 找不到就回傳 null

            if (projectVO.getImage1() != null) {
                s3Service.delete(projectVO.getImage1());
            } 
            if (projectVO.getImage2() != null) {
                s3Service.delete(projectVO.getImage2());
            } 
            if (projectVO.getImage3() != null) {
                s3Service.delete(projectVO.getImage3());
            } 
            if (projectVO.getImage4() != null) {
                s3Service.delete(projectVO.getImage4());
            } 
            if (projectVO.getImage5() != null) {
                s3Service.delete(projectVO.getImage5());
            }
            
            projectRepository.deleteById(id);

            return true;
        } else {
            return false; // id 不存在
        }
    }

    public List<ProjectVO> getAllProject() {
        List<ProjectVO> ProjectList = projectRepository.findAll();

        Base64.Encoder encoder = Base64.getEncoder();

        // 反轉列表順序：資料庫最後一筆會變成第一筆
        Collections.reverse(ProjectList);

        return ProjectList;
    }
}

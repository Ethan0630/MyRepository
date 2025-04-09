package com.example.xuanproject.project.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.xuanproject.project.dto.ProjectSimpleDTO;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectVO, Integer> {

    @Query("SELECT new com.example.xuanproject.project.dto.ProjectSimpleDTO(p.id, p.name) FROM ProjectVO p")
    List<ProjectSimpleDTO> findAllSimpleProjects();

    @Query(value = "SELECT * FROM project WHERE " +
            "(:industry IS NULL OR industry = :industry) AND " +
            "(:category IS NULL OR category = :category)", nativeQuery = true)
    List<ProjectVO> getProjectFilter(@Param("industry") Integer industry, @Param("category") Integer category);

}

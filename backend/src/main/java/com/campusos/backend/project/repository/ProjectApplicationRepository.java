package com.campusos.backend.project.repository;

import com.campusos.backend.project.entity.ProjectApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectApplicationRepository
        extends JpaRepository<ProjectApplication, Long> {

    List<ProjectApplication> findByProjectId(Long projectId);

    List<ProjectApplication> findByUserId(Long userId);

    boolean existsByProjectIdAndUserId(
            Long projectId,
            Long userId);

}
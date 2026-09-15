package com.campusos.backend.project.repository;

import com.campusos.backend.project.entity.Project;
import com.campusos.backend.project.entity.ProjectSkill;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectSkillRepository extends JpaRepository<ProjectSkill, Long> {

    List<ProjectSkill> findByProject(Project project);

    void deleteByProject(Project project);

}
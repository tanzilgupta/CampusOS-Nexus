package com.campusos.backend.skill.repository;

import com.campusos.backend.skill.entity.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {

    List<StudentSkill> findByUserId(Long userId);

    boolean existsByUserIdAndSkillId(Long userId, Long skillId);

}
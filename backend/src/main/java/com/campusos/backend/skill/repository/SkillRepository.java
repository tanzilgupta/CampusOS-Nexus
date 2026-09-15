package com.campusos.backend.skill.repository;

import com.campusos.backend.skill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill,Long>{

    Optional<Skill> findByName(String name);

}
package com.campusos.backend.project.entity;

import com.campusos.backend.skill.entity.Skill;

import jakarta.persistence.*;

@Entity
@Table(
        name = "project_skills",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {
                        "project_id",
                        "skill_id"
                })
        }
)
public class ProjectSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    public ProjectSkill() {
    }

    public Long getId() {
        return id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}
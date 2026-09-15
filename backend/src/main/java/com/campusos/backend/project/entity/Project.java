package com.campusos.backend.project.entity;

import com.campusos.backend.team.entity.Team;
import com.campusos.backend.user.entity.User;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;


    @Column(length = 3000)
    private String description;


    private String domain;


    private Integer maxMembers;


    private LocalDate deadline;

    private Integer durationWeeks;

    @Column(nullable = false)
    private String status = "OPEN";


    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;


    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL
    )
    private List<ProjectApplication> applications;


    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProjectSkill> requiredSkills;


    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Team> teams;


    public Project() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public String getDomain() {
        return domain;
    }


    public void setDomain(String domain) {
        this.domain = domain;
    }


    public Integer getMaxMembers() {
        return maxMembers;
    }


    public void setMaxMembers(Integer maxMembers) {
        this.maxMembers = maxMembers;
    }


    public LocalDate getDeadline() {
        return deadline;
    }


    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Integer getDurationWeeks() { return durationWeeks; }

    public void setDurationWeeks(Integer durationWeeks) { this.durationWeeks = durationWeeks; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }


    public User getOwner() {
        return owner;
    }


    public void setOwner(User owner) {
        this.owner = owner;
    }


    public List<ProjectApplication> getApplications() {
        return applications;
    }


    public void setApplications(List<ProjectApplication> applications) {
        this.applications = applications;
    }


    public List<ProjectSkill> getRequiredSkills() {
        return requiredSkills;
    }


    public void setRequiredSkills(List<ProjectSkill> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }


    public List<Team> getTeams() {
        return teams;
    }


    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

}

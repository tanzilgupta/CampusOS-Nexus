package com.campusos.backend.project.dto;


import java.util.List;


public class ProjectResponse {


    private Long id;

    private String title;

    private String description;

    private String domain;

    private Integer maxMembers;

    private String deadline;

    private Integer durationWeeks;

    private String status;

    private Long ownerId;

    private String ownerName;

    private List<String> requiredSkills;



    public ProjectResponse() {
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


    public String getDeadline() {
        return deadline;
    }


    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public Integer getDurationWeeks() { return durationWeeks; }
    public void setDurationWeeks(Integer durationWeeks) { this.durationWeeks = durationWeeks; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }


    public Long getOwnerId() {
        return ownerId;
    }


    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }


    public String getOwnerName() {
        return ownerName;
    }


    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }


    public List<String> getRequiredSkills() {
        return requiredSkills;
    }


    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

}

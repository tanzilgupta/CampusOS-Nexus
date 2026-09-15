package com.campusos.backend.skill.dto;

public class SkillResponse {

    private Long id;
    private String name;
    private String category;
    private String proficiency;
    private String evidence;

    public SkillResponse() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category=category;
    }

    public String getProficiency(){
        return proficiency;
    }

    public void setProficiency(String proficiency){
        this.proficiency=proficiency;
    }

    public String getEvidence(){
        return evidence;
    }

    public void setEvidence(String evidence){
        this.evidence=evidence;
    }
}
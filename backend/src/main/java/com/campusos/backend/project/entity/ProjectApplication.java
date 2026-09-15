package com.campusos.backend.project.entity;

import com.campusos.backend.user.entity.User;
import jakarta.persistence.*;

@Entity
@Table(name="project_applications")
public class ProjectApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    @Column(length = 1000)
    private String message;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;

    public ProjectApplication(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status){
        this.status=status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message){
        this.message=message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user){
        this.user=user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project){
        this.project=project;
    }
}
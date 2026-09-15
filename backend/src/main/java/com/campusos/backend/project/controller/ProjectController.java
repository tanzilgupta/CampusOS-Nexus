package com.campusos.backend.project.controller;

import com.campusos.backend.project.dto.ProjectRequest;
import com.campusos.backend.project.dto.ProjectResponse;
import com.campusos.backend.project.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ProjectResponse createProject(
            @RequestBody ProjectRequest request) {

        return projectService.createProject(request);
    }

    @GetMapping
    public List<ProjectResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{projectId}")
    public ProjectResponse getProject(
            @PathVariable Long projectId) {

        return projectService.getProject(projectId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<ProjectResponse> getProjectsByOwner(
            @PathVariable Long ownerId) {

        return projectService.getProjectsByOwner(ownerId);
    }

    @PutMapping("/{projectId}")
    public ProjectResponse updateProject(
            @PathVariable Long projectId,
            @RequestBody ProjectRequest request) {

        return projectService.updateProject(projectId, request);
    }

    @DeleteMapping("/{projectId}")
    public void deleteProject(
            @PathVariable Long projectId) {

        projectService.deleteProject(projectId);
    }
}

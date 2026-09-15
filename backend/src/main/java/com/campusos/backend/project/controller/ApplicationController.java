package com.campusos.backend.project.controller;

import com.campusos.backend.project.dto.ApplicationRequest;
import com.campusos.backend.project.dto.ApplicationResponse;
import com.campusos.backend.project.dto.ApplicationStatusRequest;
import com.campusos.backend.project.service.ApplicationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;

    }

    @PostMapping("/project/{projectId}/user/{userId}")
    public ApplicationResponse apply(
            @PathVariable Long projectId,
            @PathVariable Long userId,
            @RequestBody ApplicationRequest request) {

        return applicationService.apply(
                projectId,
                userId,
                request);

    }

    @GetMapping("/project/{projectId}")
    public List<ApplicationResponse> getProjectApplications(
            @PathVariable Long projectId) {

        return applicationService.getApplications(projectId);

    }

    @GetMapping("/user/{userId}")
    public List<ApplicationResponse> getUserApplications(
            @PathVariable Long userId) {

        return applicationService.getUserApplications(userId);

    }

    @PutMapping("/{applicationId}/status")
    public ApplicationResponse updateStatus(
            @PathVariable Long applicationId,
            @RequestBody ApplicationStatusRequest request) {

        return applicationService.updateStatus(
                applicationId,
                request.getStatus());

    }

}
package com.campusos.backend.project.service;

import com.campusos.backend.exception.DuplicateResourceException;
import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.exception.BadRequestException;
import com.campusos.backend.project.dto.ApplicationRequest;
import com.campusos.backend.project.dto.ApplicationResponse;
import com.campusos.backend.project.entity.Project;
import com.campusos.backend.project.entity.ProjectApplication;
import com.campusos.backend.project.repository.ProjectApplicationRepository;
import com.campusos.backend.project.repository.ProjectRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;
import com.campusos.backend.user.service.CurrentUserService;
import com.campusos.backend.exception.UnauthorizedException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

        private final ProjectApplicationRepository applicationRepository;

        private final ProjectRepository projectRepository;

        private final UserRepository userRepository;
        private final CurrentUserService currentUserService;

        public ApplicationService(
                        ProjectApplicationRepository applicationRepository,
                        ProjectRepository projectRepository,
                        UserRepository userRepository,
                        CurrentUserService currentUserService) {

                this.applicationRepository = applicationRepository;
                this.projectRepository = projectRepository;
                this.userRepository = userRepository;
                this.currentUserService = currentUserService;

        }

        public ApplicationResponse apply(
                        Long projectId,
                        Long userId,
                        ApplicationRequest request) {

                assertCurrentUser(userId);
                if (applicationRepository.existsByProjectIdAndUserId(
                                projectId,
                                userId)) {

                        throw new DuplicateResourceException(
                                        "Already applied to this project");

                }

                Project project = projectRepository.findById(projectId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Project not found"));

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found"));

                ProjectApplication application = new ProjectApplication();

                application.setProject(project);

                application.setUser(user);

                application.setMessage(
                                request.getMessage());

                application.setStatus(
                                "PENDING");

                return mapToResponse(
                                applicationRepository.save(application));

        }

        public List<ApplicationResponse> getApplications(
                        Long projectId) {

                Project project = projectRepository.findById(projectId)
                                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
                assertProjectOwner(project);

                return applicationRepository
                                .findByProjectId(projectId)
                                .stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());

        }

        public List<ApplicationResponse> getUserApplications(
                        Long userId) {

                assertCurrentUser(userId);

                return applicationRepository
                                .findByUserId(userId)
                                .stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());

        }

        public ApplicationResponse updateStatus(
                        Long applicationId,
                        String status) {

                ProjectApplication application = applicationRepository.findById(applicationId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Application not found"));

                assertProjectOwner(application.getProject());

                if (!status.equals("APPROVED")
                                &&
                                !status.equals("REJECTED")
                                &&
                                !status.equals("PENDING")) {

                        throw new BadRequestException(
                                        "Invalid application status");

                }

                application.setStatus(status);

                return mapToResponse(
                                applicationRepository.save(application));

        }

        private ApplicationResponse mapToResponse(
                        ProjectApplication application) {

                ApplicationResponse response = new ApplicationResponse();

                response.setId(
                                application.getId());

                response.setProjectId(
                                application.getProject().getId());

                response.setUserId(
                                application.getUser().getId());

                response.setStatus(
                                application.getStatus());

                response.setMessage(
                                application.getMessage());

                response.setUserName(
                                application.getUser().getName());

                return response;

        }

        private void assertCurrentUser(Long userId) {
                if (!currentUserService.requireCurrentUser().getId().equals(userId)) {
                        throw new UnauthorizedException("You can only access your own applications");
                }
        }

        private void assertProjectOwner(Project project) {
                if (!project.getOwner().getId().equals(currentUserService.requireCurrentUser().getId())) {
                        throw new UnauthorizedException("Only the project owner can manage applications");
                }
        }

}

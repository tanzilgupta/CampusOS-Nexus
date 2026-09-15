package com.campusos.backend.project.service;

import com.campusos.backend.exception.BadRequestException;
import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.exception.UnauthorizedException;
import com.campusos.backend.project.dto.ProjectRequest;
import com.campusos.backend.project.dto.ProjectResponse;
import com.campusos.backend.project.entity.Project;
import com.campusos.backend.project.entity.ProjectSkill;
import com.campusos.backend.project.repository.ProjectRepository;
import com.campusos.backend.project.repository.ProjectSkillRepository;
import com.campusos.backend.skill.entity.Skill;
import com.campusos.backend.skill.repository.SkillRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.service.CurrentUserService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

        private final ProjectRepository projectRepository;

        private final SkillRepository skillRepository;

        private final ProjectSkillRepository projectSkillRepository;

        private final CurrentUserService currentUserService;

        public ProjectService(
                        ProjectRepository projectRepository,
                        SkillRepository skillRepository,
                        ProjectSkillRepository projectSkillRepository,
                        CurrentUserService currentUserService) {

                this.projectRepository = projectRepository;
                this.skillRepository = skillRepository;
                this.projectSkillRepository = projectSkillRepository;
                this.currentUserService = currentUserService;

        }

        @Transactional
        public ProjectResponse createProject(
                        ProjectRequest request) {

                User owner = currentUserService.requireCurrentUser();

                Project project = new Project();

                project.setTitle(
                                request.getTitle());

                project.setDescription(
                                request.getDescription());

                project.setDomain(
                                request.getDomain());

                project.setMaxMembers(
                                request.getMaxMembers());

                project.setDurationWeeks(
                                request.getDurationWeeks());

                project.setStatus(
                                request.getStatus() == null
                                                || request.getStatus().isBlank()
                                                                ? "OPEN"
                                                                : request.getStatus());

                if (request.getDeadline() != null
                                && !request.getDeadline().isBlank()) {

                        project.setDeadline(
                                        validateDeadline(
                                                        request.getDeadline()));

                }

                project.setOwner(owner);

                Project savedProject = projectRepository.save(project);

                saveRequiredSkills(
                                savedProject,
                                request.getRequiredSkillIds());

                return map(savedProject);

        }

        public List<ProjectResponse> getAllProjects() {

                return projectRepository.findAll()
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList());

        }

        public ProjectResponse getProject(
                        Long id) {

                Project project = projectRepository.findById(id)
                                .orElseThrow(
                                                () -> new ResourceNotFoundException(
                                                                "Project not found"));

                return map(project);

        }

        public List<ProjectResponse> getProjectsByOwner(
                        Long ownerId) {

                return projectRepository
                                .findByOwnerId(ownerId)
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList());

        }

        @Transactional
        public ProjectResponse updateProject(
                        Long projectId,
                        ProjectRequest request) {

                Project project = projectRepository.findById(projectId)
                                .orElseThrow(
                                                () -> new ResourceNotFoundException(
                                                                "Project not found"));

                assertOwner(project);

                project.setTitle(
                                request.getTitle());

                project.setDescription(
                                request.getDescription());

                project.setDomain(
                                request.getDomain());

                project.setMaxMembers(
                                request.getMaxMembers());

                project.setDurationWeeks(
                                request.getDurationWeeks());

                if (request.getStatus() != null
                                && !request.getStatus().isBlank()) {

                        project.setStatus(
                                        request.getStatus());

                }

                // UPDATED DEADLINE HANDLING
                if (request.getDeadline() == null
                                || request.getDeadline().isBlank()) {

                        project.setDeadline(null);

                } else {

                        project.setDeadline(
                                        validateDeadline(
                                                        request.getDeadline()));

                }

                projectSkillRepository.deleteByProject(
                                project);

                saveRequiredSkills(
                                project,
                                request.getRequiredSkillIds());

                return map(
                                projectRepository.save(project));

        }

        public void deleteProject(
                        Long projectId) {

                Project project = projectRepository.findById(projectId)
                                .orElseThrow(
                                                () -> new ResourceNotFoundException(
                                                                "Project not found"));

                assertOwner(project);

                projectRepository.delete(project);

        }

        private void saveRequiredSkills(
                        Project project,
                        List<Long> skillIds) {

                if (skillIds == null
                                || skillIds.isEmpty()) {

                        return;

                }

                List<ProjectSkill> projectSkills = new ArrayList<>();

                for (Long skillId : skillIds) {

                        Skill skill = skillRepository.findById(skillId)
                                        .orElseThrow(
                                                        () -> new ResourceNotFoundException(
                                                                        "Skill not found"));

                        ProjectSkill projectSkill = new ProjectSkill();

                        projectSkill.setProject(
                                        project);

                        projectSkill.setSkill(
                                        skill);

                        projectSkills.add(
                                        projectSkill);

                }

                projectSkillRepository.saveAll(
                                projectSkills);

        }

        private LocalDate validateDeadline(
                        String deadline) {

                LocalDate date;

                try {

                        date = LocalDate.parse(deadline);

                } catch (Exception e) {

                        throw new BadRequestException(
                                        "Invalid deadline format. Use YYYY-MM-DD");

                }

                if (date.isBefore(
                                LocalDate.now())) {

                        throw new BadRequestException(
                                        "Deadline cannot be a past date");

                }

                return date;

        }

        private ProjectResponse map(
                        Project project) {

                ProjectResponse response = new ProjectResponse();

                response.setId(
                                project.getId());

                response.setTitle(
                                project.getTitle());

                response.setDescription(
                                project.getDescription());

                response.setDomain(
                                project.getDomain());

                response.setMaxMembers(
                                project.getMaxMembers());

                response.setDurationWeeks(
                                project.getDurationWeeks());

                response.setStatus(
                                project.getStatus());

                if (project.getDeadline() != null) {

                        response.setDeadline(
                                        project.getDeadline().toString());

                }

                if (project.getOwner() != null) {

                        response.setOwnerId(
                                        project.getOwner().getId());

                        response.setOwnerName(
                                        project.getOwner().getName());

                }

                List<String> skills = projectSkillRepository
                                .findByProject(project)
                                .stream()
                                .map(projectSkill -> projectSkill
                                                .getSkill()
                                                .getName())
                                .collect(Collectors.toList());

                response.setRequiredSkills(
                                skills);

                return response;

        }

        private void assertOwner(
                        Project project) {

                if (!project.getOwner()
                                .getId()
                                .equals(
                                                currentUserService
                                                                .requireCurrentUser()
                                                                .getId())) {

                        throw new UnauthorizedException(
                                        "Only the project owner can change this project");

                }

        }

}
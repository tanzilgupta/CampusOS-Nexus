package com.campusos.backend.team.service;

import com.campusos.backend.exception.DuplicateResourceException;
import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.exception.UnauthorizedException;
import com.campusos.backend.project.entity.Project;
import com.campusos.backend.project.repository.ProjectRepository;
import com.campusos.backend.project.repository.ProjectSkillRepository;
import com.campusos.backend.skill.repository.StudentSkillRepository;
import com.campusos.backend.team.dto.TeamGapResponse;
import com.campusos.backend.team.dto.TeamRequest;
import com.campusos.backend.team.dto.TeamResponse;
import com.campusos.backend.team.entity.Team;
import com.campusos.backend.team.entity.TeamMember;
import com.campusos.backend.team.repository.TeamMemberRepository;
import com.campusos.backend.team.repository.TeamRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.service.CurrentUserService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TeamService {

        private final TeamRepository teamRepository;
        private final ProjectRepository projectRepository;
        private final ProjectSkillRepository projectSkillRepository;
        private final TeamMemberRepository teamMemberRepository;
        private final StudentSkillRepository studentSkillRepository;
        private final CurrentUserService currentUserService;

        public TeamService(
                        TeamRepository teamRepository,
                        ProjectRepository projectRepository,
                        ProjectSkillRepository projectSkillRepository,
                        TeamMemberRepository teamMemberRepository,
                        StudentSkillRepository studentSkillRepository,
                        CurrentUserService currentUserService) {

                this.teamRepository = teamRepository;
                this.projectRepository = projectRepository;
                this.projectSkillRepository = projectSkillRepository;
                this.teamMemberRepository = teamMemberRepository;
                this.studentSkillRepository = studentSkillRepository;
                this.currentUserService = currentUserService;
        }

        public TeamResponse createTeam(TeamRequest request) {

                User user = currentUserService.requireCurrentUser();

                Project project = projectRepository.findById(request.getProjectId())
                                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

                assertProjectOwner(project, user);

                List<Team> existingTeams = teamRepository.findByProjectId(request.getProjectId());

                boolean exists = existingTeams.stream()
                                .anyMatch(team -> team.getName().equalsIgnoreCase(request.getName()));

                if (exists) {
                        throw new DuplicateResourceException("Team already exists in this project");
                }

                Team team = new Team();
                team.setName(request.getName());
                team.setDescription(request.getDescription());
                team.setDomain(request.getDomain());
                team.setCreatedBy(user);
                team.setProject(project);

                Team saved = teamRepository.save(team);

                return map(saved);
        }

        public List<TeamResponse> getAllTeams() {

                return teamRepository.findAll()
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList());
        }

        public TeamResponse getTeamById(Long id) {

                Team team = teamRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

                assertTeamOwner(team);

                return map(team);
        }

        public List<TeamResponse> getTeamsByProject(Long projectId) {

                return teamRepository.findByProjectId(projectId)
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList());
        }

        public List<TeamResponse> getTeamsCreatedByUser(Long userId) {

                return teamRepository.findByCreatedById(userId)
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList());
        }

        public TeamResponse updateTeam(Long id, TeamRequest request) {

                Team team = teamRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

                team.setName(request.getName());
                team.setDescription(request.getDescription());
                team.setDomain(request.getDomain());

                return map(teamRepository.save(team));
        }

        public void deleteTeam(Long id) {

                Team team = teamRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
                assertTeamOwner(team);
                teamRepository.delete(team);
        }

        public TeamGapResponse analyzeGaps(Long teamId) {

                Team team = teamRepository.findById(teamId)
                                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

                Set<String> required = projectSkillRepository.findByProject(team.getProject())
                                .stream()
                                .map(projectSkill -> projectSkill.getSkill().getName().toLowerCase())
                                .collect(Collectors.toSet());

                Set<String> teamSkills = teamMemberRepository.findByTeamId(teamId)
                                .stream()
                                .map(TeamMember::getUser)
                                .flatMap(user -> studentSkillRepository.findByUserId(user.getId()).stream())
                                .map(studentSkill -> studentSkill.getSkill().getName().toLowerCase())
                                .collect(Collectors.toSet());

                List<String> covered = required.stream()
                                .filter(teamSkills::contains)
                                .sorted()
                                .toList();

                List<String> missing = required.stream()
                                .filter(skill -> !teamSkills.contains(skill))
                                .sorted()
                                .toList();

                int coverage = required.isEmpty()
                                ? 100
                                : (covered.size() * 100) / required.size();

                String recommendation = missing.isEmpty()
                                ? "Your team currently covers every required skill. Focus on delivery and contributions."
                                : "Add teammates with: " + String.join(", ", missing) + ".";

                return TeamGapResponse.builder()
                                .coveredSkills(covered)
                                .missingSkills(missing)
                                .coveragePercentage(coverage)
                                .recommendation(recommendation)
                                .build();
        }

        private TeamResponse map(Team team) {

                TeamResponse response = new TeamResponse();

                response.setId(team.getId());
                response.setName(team.getName());
                response.setDescription(team.getDescription());
                response.setDomain(team.getDomain());

                if (team.getProject() != null) {
                        response.setProjectId(team.getProject().getId());
                        response.setProjectName(team.getProject().getTitle());
                }

                if (team.getCreatedBy() != null) {
                        response.setCreatedBy(team.getCreatedBy().getId());
                        response.setCreatedByName(team.getCreatedBy().getName());
                }

                return response;
        }

        private void assertProjectOwner(Project project, User user) {
                if (!project.getOwner().getId().equals(user.getId())) {
                        throw new UnauthorizedException("Only the project owner can create a team");
                }
        }

        private void assertTeamOwner(Team team) {
                if (!team.getCreatedBy().getId().equals(currentUserService.requireCurrentUser().getId())) {
                        throw new UnauthorizedException("Only the team creator can change this team");
                }
        }
}

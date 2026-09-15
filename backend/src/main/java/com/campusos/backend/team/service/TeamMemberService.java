package com.campusos.backend.team.service;

import com.campusos.backend.exception.DuplicateResourceException;
import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.team.dto.TeamMemberRequest;
import com.campusos.backend.team.dto.TeamMemberResponse;
import com.campusos.backend.team.entity.Team;
import com.campusos.backend.team.entity.TeamMember;
import com.campusos.backend.team.repository.TeamMemberRepository;
import com.campusos.backend.team.repository.TeamRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;
import com.campusos.backend.user.service.CurrentUserService;
import com.campusos.backend.exception.UnauthorizedException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamMemberService {

        private final TeamMemberRepository teamMemberRepository;

        private final TeamRepository teamRepository;

        private final UserRepository userRepository;
        private final CurrentUserService currentUserService;

        public TeamMemberService(
                        TeamMemberRepository teamMemberRepository,
                        TeamRepository teamRepository,
                        UserRepository userRepository,
                        CurrentUserService currentUserService) {

                this.teamMemberRepository = teamMemberRepository;
                this.teamRepository = teamRepository;
                this.userRepository = userRepository;
                this.currentUserService = currentUserService;

        }

        public TeamMemberResponse addMember(
                        Long teamId,
                        Long userId,
                        TeamMemberRequest request) {

                Team team = teamRepository.findById(teamId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Team not found"));

                assertTeamOwner(team);

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found"));

                // Prevent duplicate team membership
                if (teamMemberRepository.existsByTeamIdAndUserId(teamId, userId)) {

                        throw new DuplicateResourceException(
                                        "User already belongs to this team");

                }

                TeamMember member = new TeamMember();

                member.setTeam(team);

                member.setUser(user);

                member.setRole(request.getRole());

                return map(
                                teamMemberRepository.save(member));

        }

        public List<TeamMemberResponse> getMembers(
                        Long teamId) {

                return teamMemberRepository
                                .findByTeamId(teamId)
                                .stream()
                                .map(this::map)
                                .collect(Collectors.toList());

        }

        public void removeMember(
                        Long memberId) {

                TeamMember member = teamMemberRepository.findById(memberId)
                                .orElseThrow(() -> new ResourceNotFoundException("Team member not found"));
                assertTeamOwner(member.getTeam());
                teamMemberRepository.delete(member);

        }

        private TeamMemberResponse map(
                        TeamMember member) {

                TeamMemberResponse response = new TeamMemberResponse();

                response.setId(
                                member.getId());

                response.setTeamId(
                                member.getTeam().getId());

                response.setUserId(
                                member.getUser().getId());

                response.setRole(
                                member.getRole());

                return response;

        }

        private void assertTeamOwner(Team team) {
                if (!team.getCreatedBy().getId().equals(currentUserService.requireCurrentUser().getId())) {
                        throw new UnauthorizedException("Only the team creator can manage members");
                }
        }

}

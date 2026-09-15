package com.campusos.backend.team.controller;

import com.campusos.backend.team.dto.TeamMemberRequest;
import com.campusos.backend.team.dto.TeamMemberResponse;
import com.campusos.backend.team.service.TeamMemberService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team-members")
@CrossOrigin
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    public TeamMemberController(
            TeamMemberService teamMemberService) {

        this.teamMemberService = teamMemberService;

    }

    @PostMapping("/team/{teamId}/user/{userId}")
    public ResponseEntity<TeamMemberResponse> addMember(

            @PathVariable Long teamId,

            @PathVariable Long userId,

            @RequestBody TeamMemberRequest request

    ) {

        return ResponseEntity.ok(
                teamMemberService.addMember(
                        teamId,
                        userId,
                        request));

    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<TeamMemberResponse>> getMembers(

            @PathVariable Long teamId

    ) {

        return ResponseEntity.ok(
                teamMemberService.getMembers(teamId));

    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<String> removeMember(

            @PathVariable Long memberId

    ) {

        teamMemberService.removeMember(memberId);

        return ResponseEntity.ok(
                "Team member removed successfully");

    }

}
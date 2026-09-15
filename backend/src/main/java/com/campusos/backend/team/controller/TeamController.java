package com.campusos.backend.team.controller;

import com.campusos.backend.team.dto.TeamRequest;
import com.campusos.backend.team.dto.TeamResponse;
import com.campusos.backend.team.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.campusos.backend.team.dto.TeamGapResponse;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin
public class TeamController {

        private final TeamService teamService;

        public TeamController(TeamService teamService) {
                this.teamService = teamService;
        }

        @PostMapping
        public ResponseEntity<TeamResponse> createTeam(@RequestBody TeamRequest request) {
                return ResponseEntity.ok(teamService.createTeam(request));
        }

        @GetMapping
        public ResponseEntity<List<TeamResponse>> getAllTeams() {
                return ResponseEntity.ok(teamService.getAllTeams());
        }

        @GetMapping("/{teamId}")
        public ResponseEntity<TeamResponse> getTeam(@PathVariable Long teamId) {
                return ResponseEntity.ok(teamService.getTeamById(teamId));
        }

        @GetMapping("/project/{projectId}")
        public ResponseEntity<List<TeamResponse>> getProjectTeams(@PathVariable Long projectId) {
                return ResponseEntity.ok(teamService.getTeamsByProject(projectId));
        }

        @GetMapping("/{teamId}/gap-analysis")
        public ResponseEntity<TeamGapResponse> getGapAnalysis(@PathVariable Long teamId) {
                return ResponseEntity.ok(teamService.analyzeGaps(teamId));
        }

        @PutMapping("/{teamId}")
        public ResponseEntity<TeamResponse> updateTeam(@PathVariable Long teamId, @RequestBody TeamRequest request) {
                return ResponseEntity.ok(teamService.updateTeam(teamId, request));
        }

        @DeleteMapping("/{teamId}")
        public ResponseEntity<String> deleteTeam(@PathVariable Long teamId) {
                teamService.deleteTeam(teamId);
                return ResponseEntity.ok("Team deleted successfully");
        }

}

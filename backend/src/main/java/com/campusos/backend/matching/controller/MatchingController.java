package com.campusos.backend.matching.controller;

import com.campusos.backend.matching.dto.RecommendationResponse;
import com.campusos.backend.matching.service.MatchingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.OPTIONS
        }
)
public class MatchingController {

    private final MatchingService matchingService;

    public MatchingController(
            MatchingService matchingService) {

        this.matchingService = matchingService;
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(

            @PathVariable Long projectId

    ) {

        return ResponseEntity.ok(
                matchingService.recommendUsers(projectId)
        );
    }
}
package com.campusos.backend.matching.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecommendationResponse {

    private Long userId;

    private String userName;

    private Integer matchPercentage;

    private String matchReason;

    private List<String> matchingSkills;

    private Integer skillScore;

    private Integer experienceScore;

    private Integer interestScore;

    private Integer availabilityScore;

    private Integer collaborationScore;

    private List<String> reasons;
}

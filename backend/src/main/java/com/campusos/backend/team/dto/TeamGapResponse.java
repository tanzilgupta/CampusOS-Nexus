package com.campusos.backend.team.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class TeamGapResponse {
    private List<String> coveredSkills;
    private List<String> missingSkills;
    private int coveragePercentage;
    private String recommendation;
}

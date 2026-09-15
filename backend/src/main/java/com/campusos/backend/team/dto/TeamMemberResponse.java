package com.campusos.backend.team.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamMemberResponse {

    private Long id;

    private Long teamId;

    private Long userId;

    private String role;

}
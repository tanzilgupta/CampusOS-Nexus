package com.campusos.backend.team.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamRequest {

    private String name;

    private String description;

    private String domain;

    private Long projectId;

}
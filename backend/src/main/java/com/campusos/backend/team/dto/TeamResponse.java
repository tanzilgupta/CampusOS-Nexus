package com.campusos.backend.team.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamResponse {

    private Long id;

    private String name;

    private String description;

    private String domain;

    private Long projectId;

    private Long createdBy;

    private String projectName;

    private String createdByName;

}
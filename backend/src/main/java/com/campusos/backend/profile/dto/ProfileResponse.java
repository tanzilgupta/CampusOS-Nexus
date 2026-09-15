package com.campusos.backend.profile.dto;


import lombok.Builder;
import lombok.Data;
import java.util.Set;


@Data
@Builder
public class ProfileResponse {


    private Long id;

    private String fullName;

    private String bio;

    private String university;

    private String degree;

    private String year;

    private String branch;

    private String githubUrl;

    private String linkedinUrl;

    private String portfolioUrl;

    private String resumeUrl;

    private String availability;

    private Set<String> interests;

}

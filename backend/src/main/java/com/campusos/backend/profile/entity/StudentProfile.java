package com.campusos.backend.profile.entity;

import com.campusos.backend.user.entity.User;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String bio;

    private String university;

    private String degree;

    @Column(name = "study_year")
    private String year;

    private String branch;

    private String githubUrl;

    private String linkedinUrl;

    private String portfolioUrl;

    private String resumeUrl;

    private String availability;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "student_interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "interest", nullable = false)
    @Builder.Default
    private Set<String> interests = new LinkedHashSet<>();

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

}
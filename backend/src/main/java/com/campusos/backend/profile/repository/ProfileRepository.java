package com.campusos.backend.profile.repository;

import com.campusos.backend.profile.entity.StudentProfile;
import com.campusos.backend.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository
        extends JpaRepository<StudentProfile, Long> {

    Optional<StudentProfile> findByUser(User user);
    Optional<StudentProfile> findByUserId(Long userId);

}
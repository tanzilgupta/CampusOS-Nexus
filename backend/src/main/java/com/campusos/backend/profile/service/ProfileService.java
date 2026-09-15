package com.campusos.backend.profile.service;

import com.campusos.backend.exception.DuplicateResourceException;
import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.profile.dto.ProfileRequest;
import com.campusos.backend.profile.dto.ProfileResponse;
import com.campusos.backend.profile.entity.StudentProfile;
import com.campusos.backend.profile.repository.ProfileRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.service.CurrentUserService;

import java.util.LinkedHashSet;

import org.springframework.stereotype.Service;

@Service
public class ProfileService {

        private final ProfileRepository profileRepository;
        private final CurrentUserService currentUserService;


        public ProfileService(
                        ProfileRepository profileRepository,
                        CurrentUserService currentUserService) {

                this.profileRepository = profileRepository;
                this.currentUserService = currentUserService;

        }


        private User getLoggedInUser() {

                return currentUserService.requireCurrentUser();

        }


        public ProfileResponse createProfile(
                        ProfileRequest request) {

                User user = getLoggedInUser();


                if (profileRepository.findByUser(user).isPresent()) {

                        throw new DuplicateResourceException(
                                        "Profile already exists");

                }


                StudentProfile profile = StudentProfile.builder()

                                .user(user)

                                .fullName(request.getFullName())

                                .bio(request.getBio())

                                .university(request.getUniversity())

                                .degree(request.getDegree())

                                .year(request.getYear())

                                .branch(request.getBranch())

                                .githubUrl(request.getGithubUrl())

                                .linkedinUrl(request.getLinkedinUrl())

                                .portfolioUrl(request.getPortfolioUrl())

                                .resumeUrl(request.getResumeUrl())

                                .availability(request.getAvailability())

                                .interests(request.getInterests() == null
                                                ? new LinkedHashSet<>()
                                                : new LinkedHashSet<>(request.getInterests()))

                                .build();


                StudentProfile saved = profileRepository.save(profile);


                return mapToResponse(saved);

        }



        public ProfileResponse getProfile() {

                User user = getLoggedInUser();


                StudentProfile profile = profileRepository.findByUser(user)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Profile not found"));


                return mapToResponse(profile);

        }

        public ProfileResponse getProfileByUserId(Long userId) {
                StudentProfile profile = profileRepository.findByUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
                return mapToResponse(profile);
        }



        public ProfileResponse updateProfile(
                        ProfileRequest request) {


                User user = getLoggedInUser();


                StudentProfile profile = profileRepository.findByUser(user)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Profile not found"));


                profile.setFullName(request.getFullName());

                profile.setBio(request.getBio());

                profile.setUniversity(request.getUniversity());

                profile.setDegree(request.getDegree());

                profile.setYear(request.getYear());

                profile.setBranch(request.getBranch());

                profile.setGithubUrl(request.getGithubUrl());

                profile.setLinkedinUrl(request.getLinkedinUrl());

                profile.setPortfolioUrl(request.getPortfolioUrl());

                profile.setResumeUrl(request.getResumeUrl());

                profile.setAvailability(request.getAvailability());


                profile.setInterests(
                                request.getInterests() == null
                                                ? new LinkedHashSet<>()
                                                : new LinkedHashSet<>(request.getInterests())
                );


                StudentProfile updated = profileRepository.save(profile);


                return mapToResponse(updated);

        }



        public void deleteProfile() {

                User user = getLoggedInUser();


                StudentProfile profile = profileRepository.findByUser(user)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Profile not found"));


                profileRepository.delete(profile);

        }



        private ProfileResponse mapToResponse(
                        StudentProfile profile) {


                return ProfileResponse.builder()

                                .id(profile.getId())

                                .fullName(profile.getFullName())

                                .bio(profile.getBio())

                                .university(profile.getUniversity())

                                .degree(profile.getDegree())

                                .year(profile.getYear())

                                .branch(profile.getBranch())

                                .githubUrl(profile.getGithubUrl())

                                .linkedinUrl(profile.getLinkedinUrl())

                                .portfolioUrl(profile.getPortfolioUrl())

                                .resumeUrl(profile.getResumeUrl())

                                .availability(profile.getAvailability())

                                .interests(profile.getInterests())

                                .build();

        }

}
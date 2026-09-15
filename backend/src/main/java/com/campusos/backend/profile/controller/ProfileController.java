package com.campusos.backend.profile.controller;

import com.campusos.backend.profile.dto.ProfileRequest;
import com.campusos.backend.profile.dto.ProfileResponse;
import com.campusos.backend.profile.service.ProfileService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin
public class ProfileController {

        private final ProfileService profileService;

        public ProfileController(
                        ProfileService profileService) {

                this.profileService = profileService;

        }

        @PostMapping
        public ResponseEntity<ProfileResponse> createProfile(
                        @RequestBody ProfileRequest request) {

                return ResponseEntity.ok(
                                profileService.createProfile(request));

        }

        @GetMapping
        public ResponseEntity<ProfileResponse> getProfile() {

                return ResponseEntity.ok(
                                profileService.getProfile());

        }

        @GetMapping("/{userId}")
        public ResponseEntity<ProfileResponse> getProfileByUserId(@PathVariable Long userId) {
                return ResponseEntity.ok(profileService.getProfileByUserId(userId));
        }

        @PutMapping
        public ResponseEntity<ProfileResponse> updateProfile(
                        @RequestBody ProfileRequest request) {

                return ResponseEntity.ok(
                                profileService.updateProfile(request));

        }

        @DeleteMapping
        public ResponseEntity<String> deleteProfile() {

                profileService.deleteProfile();

                return ResponseEntity.ok(
                                "Profile deleted successfully");

        }

}
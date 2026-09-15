package com.campusos.backend.matching.service;


import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.matching.dto.RecommendationResponse;
import com.campusos.backend.project.entity.Project;
import com.campusos.backend.project.entity.ProjectSkill;
import com.campusos.backend.project.repository.ProjectRepository;
import com.campusos.backend.project.repository.ProjectSkillRepository;
import com.campusos.backend.skill.entity.StudentSkill;
import com.campusos.backend.skill.repository.StudentSkillRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;
import com.campusos.backend.user.service.CurrentUserService;
import com.campusos.backend.profile.entity.StudentProfile;
import com.campusos.backend.profile.repository.ProfileRepository;
import com.campusos.backend.review.entity.Review;
import com.campusos.backend.review.repository.ReviewRepository;
import com.campusos.backend.exception.UnauthorizedException;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


@Service
public class MatchingService {


    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    private final StudentSkillRepository studentSkillRepository;

    private final ProjectSkillRepository projectSkillRepository;
    private final ProfileRepository profileRepository;
    private final ReviewRepository reviewRepository;
    private final CurrentUserService currentUserService;



    public MatchingService(
            ProjectRepository projectRepository,
            UserRepository userRepository,
            StudentSkillRepository studentSkillRepository,
            ProjectSkillRepository projectSkillRepository,
            ProfileRepository profileRepository,
            ReviewRepository reviewRepository,
            CurrentUserService currentUserService
    ) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.projectSkillRepository = projectSkillRepository;
        this.profileRepository = profileRepository;
        this.reviewRepository = reviewRepository;
        this.currentUserService = currentUserService;

    }



    public List<RecommendationResponse> recommendUsers(
            Long projectId
    ) {


        Project project =
                projectRepository.findById(projectId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found"
                        )
                );

        if (!project.getOwner().getId().equals(currentUserService.requireCurrentUser().getId())) {
            throw new UnauthorizedException("Only the project owner can view teammate recommendations");
        }



        List<ProjectSkill> requiredSkills =
                projectSkillRepository.findByProject(project);



        List<User> users =
                userRepository.findAll();



        List<RecommendationResponse> recommendations =
                new ArrayList<>();



        for(User user : users) {



            // skip project owner
            if(project.getOwner()!=null
                    &&
                    project.getOwner()
                            .getId()
                            .equals(user.getId())) {

                continue;
            }



            List<StudentSkill> studentSkills =
                    studentSkillRepository
                            .findByUserId(user.getId());



            if(studentSkills.isEmpty()) {

                continue;

            }



            List<String> matchedSkills =
                    new ArrayList<>();

            List<String> reasons = new ArrayList<>();



            for(ProjectSkill requiredSkill : requiredSkills) {


                String skillName =
                        requiredSkill
                                .getSkill()
                                .getName();



                boolean matched =
                        studentSkills.stream()

                        .anyMatch(studentSkill ->
                                studentSkill
                                .getSkill()
                                .getName()
                                .equalsIgnoreCase(skillName)
                        );



                if(matched) {

                    matchedSkills.add(skillName);

                }

            }



            if(matchedSkills.isEmpty()) {

                continue;

            }



            int score = 0;

            int skillScore = 0;



            if(!requiredSkills.isEmpty()) {

                skillScore = (matchedSkills.size() * 100) / requiredSkills.size();

            }

            int evidenceMatches = (int) studentSkills.stream()
                    .filter(studentSkill -> studentSkill.getEvidence() != null
                            && !studentSkill.getEvidence().isBlank()
                            && matchedSkills.stream().anyMatch(skill -> skill.equalsIgnoreCase(studentSkill.getSkill().getName())))
                    .count();
            int experienceScore = requiredSkills.isEmpty() ? 0
                    : (evidenceMatches * 100) / requiredSkills.size();

            StudentProfile profile = profileRepository.findByUser(user).orElse(null);
            boolean sharedInterest = profile != null && profile.getInterests() != null
                    && profile.getInterests().stream().anyMatch(interest ->
                            interest.equalsIgnoreCase(project.getDomain())
                            || project.getDomain().toLowerCase().contains(interest.toLowerCase())
                            || interest.toLowerCase().contains(project.getDomain().toLowerCase()));
            int interestScore = sharedInterest ? 100 : 0;
            int availabilityScore = profile != null && profile.getAvailability() != null
                    && !profile.getAvailability().isBlank() ? 100 : 0;

            List<Review> reviews = reviewRepository.findByReviewedUserId(user.getId());
            int collaborationScore = reviews.isEmpty() ? 50 : (int) Math.round(reviews.stream()
                    .mapToInt(Review::getRating).average().orElse(0) * 20);

            score = (int) Math.round(skillScore * 0.40 + experienceScore * 0.25
                    + interestScore * 0.20 + availabilityScore * 0.10 + collaborationScore * 0.05);

            reasons.add(matchedSkills.size() + " required skill" + (matchedSkills.size() == 1 ? "" : "s") + " matched");
            if (experienceScore > 0) reasons.add("Evidence attached for relevant technical experience");
            if (sharedInterest) reasons.add("Interest aligns with the " + project.getDomain() + " domain");
            if (availabilityScore > 0) reasons.add("Availability has been provided");
            if (!reviews.isEmpty()) reasons.add("Collaboration history is backed by peer reviews");



            RecommendationResponse response =
                    RecommendationResponse.builder()

                    .userId(user.getId())

                    .userName(user.getName())

                    .matchPercentage(score)

                    .matchReason(
                            String.join(" • ", reasons)
                    )

                    .matchingSkills(
                            matchedSkills
                    )

                    .skillScore(skillScore)
                    .experienceScore(experienceScore)
                    .interestScore(interestScore)
                    .availabilityScore(availabilityScore)
                    .collaborationScore(collaborationScore)
                    .reasons(reasons)

                    .build();



            recommendations.add(response);

        }



        return recommendations.stream()

                .sorted(
                        Comparator
                        .comparing(
                                RecommendationResponse
                                ::getMatchPercentage
                        )
                        .reversed()
                )

                .toList();

    }

}

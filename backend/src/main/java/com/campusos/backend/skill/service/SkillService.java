package com.campusos.backend.skill.service;

import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.exception.DuplicateResourceException;

import com.campusos.backend.skill.dto.SkillRequest;
import com.campusos.backend.skill.dto.SkillResponse;

import com.campusos.backend.skill.entity.Skill;
import com.campusos.backend.skill.entity.StudentSkill;

import com.campusos.backend.skill.repository.SkillRepository;
import com.campusos.backend.skill.repository.StudentSkillRepository;

import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;
import com.campusos.backend.user.service.CurrentUserService;
import com.campusos.backend.exception.UnauthorizedException;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class SkillService {


    private final SkillRepository skillRepository;

    private final StudentSkillRepository studentSkillRepository;

    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;



    public SkillService(
            SkillRepository skillRepository,
            StudentSkillRepository studentSkillRepository,
            UserRepository userRepository,
            CurrentUserService currentUserService
    ) {

        this.skillRepository = skillRepository;

        this.studentSkillRepository = studentSkillRepository;

        this.userRepository = userRepository;
        this.currentUserService = currentUserService;

    }




    public SkillResponse addSkill(
            Long userId,
            SkillRequest request
    ) {


        assertCurrentUser(userId);

        User user =
                userRepository.findById(userId)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                        );



        Skill skill =
                skillRepository.findByName(
                        request.getName()
                )
                .orElse(null);



        if(skill == null) {

            skill = new Skill();

            skill.setName(
                    request.getName()
            );

            skill.setCategory(
                    request.getCategory()
            );


            skill =
                    skillRepository.save(skill);

        }




        if(studentSkillRepository
                .existsByUserIdAndSkillId(
                        userId,
                        skill.getId()
                )) {


            throw new DuplicateResourceException(
                    "Skill already added to user"
            );

        }




        StudentSkill studentSkill =
                new StudentSkill();


        studentSkill.setUser(
                user
        );


        studentSkill.setSkill(
                skill
        );


        studentSkill.setProficiency(
                request.getProficiency()
        );


        studentSkill.setEvidence(
                request.getEvidence()
        );



        studentSkill =
                studentSkillRepository.save(
                        studentSkill
                );


        return map(
                studentSkill
        );

    }






    // User specific skills
    public List<SkillResponse> getSkills(
            Long userId
    ) {


        List<StudentSkill> skills =
                studentSkillRepository.findByUserId(
                        userId
                );


        List<SkillResponse> response =
                new ArrayList<>();



        for(StudentSkill skill : skills) {

            response.add(
                    map(skill)
            );

        }


        return response;

    }






    // All skills available for projects
    public List<SkillResponse> getAllSkills() {


        List<Skill> skills =
                skillRepository.findAll();



        List<SkillResponse> response =
                new ArrayList<>();



        for(Skill skill : skills) {


            SkillResponse skillResponse =
                    new SkillResponse();


            skillResponse.setId(
                    skill.getId()
            );


            skillResponse.setName(
                    skill.getName()
            );


            skillResponse.setCategory(
                    skill.getCategory()
            );


            response.add(
                    skillResponse
            );

        }


        return response;

    }







    public void deleteSkill(
            Long studentSkillId
    ) {


        StudentSkill skill =
                studentSkillRepository.findById(
                        studentSkillId
                )

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Skill not found"
                        )
                );

        assertCurrentUser(skill.getUser().getId());


        studentSkillRepository.delete(
                skill
        );

    }






    private SkillResponse map(
            StudentSkill studentSkill
    ) {


        SkillResponse response =
                new SkillResponse();



        response.setId(
                studentSkill.getId()
        );


        response.setName(
                studentSkill.getSkill().getName()
        );


        response.setCategory(
                studentSkill.getSkill().getCategory()
        );


        response.setProficiency(
                studentSkill.getProficiency()
        );


        response.setEvidence(
                studentSkill.getEvidence()
        );


        return response;

    }

    private void assertCurrentUser(Long userId) {
        if (!currentUserService.requireCurrentUser().getId().equals(userId)) {
            throw new UnauthorizedException("You can only manage your own skills");
        }
    }


}

package com.campusos.backend.skill.controller;

import com.campusos.backend.skill.dto.SkillRequest;
import com.campusos.backend.skill.dto.SkillResponse;
import com.campusos.backend.skill.service.SkillService;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/skills")
public class SkillController {


    private final SkillService skillService;


    public SkillController(
            SkillService skillService
    ) {

        this.skillService = skillService;

    }



    @PostMapping("/{userId}")
    public SkillResponse addSkill(

            @PathVariable Long userId,

            @RequestBody SkillRequest request

    ) {

        return skillService.addSkill(
                userId,
                request
        );

    }




    // Get skills of a specific user
    @GetMapping("/{userId}")
    public List<SkillResponse> getSkills(

            @PathVariable Long userId

    ) {

        return skillService.getSkills(
                userId
        );

    }




    // Get all available skills
    // Used while creating projects
    @GetMapping
    public List<SkillResponse> getAllSkills() {

        return skillService.getAllSkills();

    }




    @DeleteMapping("/{studentSkillId}")
    public String deleteSkill(

            @PathVariable Long studentSkillId

    ) {

        skillService.deleteSkill(
                studentSkillId
        );


        return "Skill deleted successfully";

    }

}
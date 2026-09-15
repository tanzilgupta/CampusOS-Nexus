import api from "../api/api";

import type {
    Skill,
    SkillRequest,
} from "../types/skill";


const skillService = {


    async getAllSkills(): Promise<Skill[]> {

        const response =
            await api.get<Skill[]>(
                "/skills"
            );


        return response.data;

    },



    async getSkills(
        userId: number
    ): Promise<Skill[]> {

        const response =
            await api.get<Skill[]>(
                `/skills/${userId}`
            );


        return response.data;

    },



    async addSkill(
        userId: number,
        skill: SkillRequest
    ): Promise<Skill> {


        const response =
            await api.post<Skill>(
                `/skills/${userId}`,
                skill
            );


        return response.data;

    },



    async deleteSkill(
        skillId: number
    ): Promise<void> {

        await api.delete(
            `/skills/${skillId}`
        );

    },


};


export default skillService;
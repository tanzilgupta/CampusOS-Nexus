import api from "../api/api";

import type {
    Profile,
    ProfileRequest,
} from "../types/profile";


const profileService = {


    async getProfile(): Promise<Profile> {

        const response = await api.get<Profile>(
            "/profile"
        );

        return response.data;

    },

    async getPublicProfile(userId: number): Promise<Profile> {
        const response = await api.get<Profile>(
            `/profile/${userId}`
        );
        return response.data;
    },


    async createProfile(
        profile: ProfileRequest
    ): Promise<Profile> {

        const response = await api.post<Profile>(
            "/profile",
            profile
        );

        return response.data;

    },


    async updateProfile(
        profile: ProfileRequest
    ): Promise<Profile> {

        const response = await api.put<Profile>(
            "/profile",
            profile
        );

        return response.data;

    },


    async deleteProfile(): Promise<void> {

        await api.delete(
            "/profile"
        );

    },


};


export default profileService;
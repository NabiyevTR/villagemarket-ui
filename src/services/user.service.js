import axios from "axios";
import authHeader from "@/services/auth-header";

const apiUserProfileClient = {

    async readUserProfile() {
        const response = await axios.get("/profile/", {headers: authHeader()})
        return response.data;
    },

    async updateUser( requestData) {
        const response = await axios.patch("/profile/", requestData, {headers: authHeader()})
        return response.data;
    }
};

export default apiUserProfileClient;
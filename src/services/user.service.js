import axios from "axios";
import authHeader from "@/services/auth-header";

const apiUserProfileClient = {

    async readUserProfile() {
        console.log('Sending get user profile request');
        const response = await axios.get("/profile/", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        await console.log('Get user profile: ', response);
        return response.data;
    },

    async updateUser( requestData) {
        console.log('Sending update user profile request: ', requestData);
        const response = await axios.patch("/profile/", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    }
};

export default apiUserProfileClient;
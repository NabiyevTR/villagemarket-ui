import axios from "axios";
import authHeader from "@/services/auth-header";

const apiUserClient = {

    async readUsers() {
        console.log('Sending get all users request');
        const response = await axios.get("/cms/user", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        console.log('Get users: ', response);
        return response.data;
    },

    async createUser(requestData) {
        console.log('Sending create user request: ', requestData);
        const response = await axios.post("/cms/user", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
                return response.data;
    },

    async readUser(userId) {
        console.log('Sending get user request for user with id=', userId);
        const response = await axios.get("/cms/user/" + userId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get user: ', response);
        return response.data;
    },

    async deleteUser(userId) {
        console.log('Sending delete user request for user with id=', userId);
        const response = await axios.delete("/cms/user/" + userId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    },

    async updateUser(requestData) {
        console.log('Sending update user request: ', requestData);
        const response = await axios.patch("/cms/user/" + requestData.id + "/edit", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    }
};

export default apiUserClient;
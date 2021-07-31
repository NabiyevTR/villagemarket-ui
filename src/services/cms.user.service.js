import axios from "axios";
import authHeader from "@/services/auth-header";

const apiUserClient = {

    async readUsers() {
        const response = await axios.get("/cms/user", {headers: authHeader()})
        return response.data;
    },

    async createUser(requestData) {
        const response = await axios.post("/cms/user", requestData, {headers: authHeader()})
        return response.data;
    },

    async readUser(userId) {
        const response = await axios.get("/cms/user/" + userId, {headers: authHeader()})
        return response.data;
    },

    async deleteUser(userId) {
        const response = await axios.delete("/cms/user/" + userId, {headers: authHeader()})
        return response.data;
    },

    async updateUser( requestData) {
        const response = await axios.patch("/cms/user/"  + requestData.id + "/edit", requestData, {headers: authHeader()})
        return response.data;
    }
};

export default apiUserClient;
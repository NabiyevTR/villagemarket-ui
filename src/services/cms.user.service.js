import axios from "axios";
import authHeader from "@/services/auth-header";

const apiUserClient = {

    async readUsers() {
        const response = await axios.get("/user", {headers: authHeader()})
        return response.data;
    },

    async createUser(requestData) {
        const response = await axios.post("/user/new", requestData)
        return response.data;
    },

    async readUser(userId) {
        const response = await axios.get("user/" + userId, {headers: authHeader()})
        return response.data;
    },

    async deleteUser(userId) {
        const response = await axios.delete("/user/" + userId)
        return response.data;
    },

    async updateUser(userId, requestData) {
        const response = await axios.patch("/user/" + userId, requestData)
        return response.data;
    }
};

export default apiUserClient;
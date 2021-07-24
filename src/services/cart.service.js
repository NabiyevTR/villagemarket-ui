import axios from "axios";
import authHeader from "@/services/auth-header";

const apiCartClient = {

    async getCart() {
        const response = await axios.get("/cart", {headers: authHeader()})
        return response.data;
    },

    async updateCart(requestData) {
        const response = await axios.post("/cart", requestData, {headers: authHeader()})
        return response.data;
    }

};

export default apiCartClient;
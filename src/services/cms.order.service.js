import axios from "axios";
import authHeader from "@/services/auth-header";

const apiOrderClient = {

    async readOrders() {
        const response = await axios.get("/order", {headers: authHeader()})
        return response.data;
    },

    async createOrder(requestData) {
        const response = await axios.post("/order/new", requestData)
        return response.data;
    },

    async readOrder(orderId) {
        const response = await axios.get("order/" + orderId, {headers: authHeader()})
        return response.data;
    },

    async deleteOrder(userId) {
        const response = await axios.delete("/order/" + userId)
        return response.data;
    },

    async updateOrder(orderId, requestData) {
        const response = await axios.patch("/order/" + orderId, requestData)
        return response.data;
    }

};

export default apiOrderClient;
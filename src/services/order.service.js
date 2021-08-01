import axios from "axios";
import authHeader from "@/services/auth-header";

const apiOrderClient = {

    async getDataForOrder() {
        const response = await axios.get("/order", {headers: authHeader()})
        return response.data;
    },

    async createOrder(requestData) {
        const response = await axios.post("/order", requestData, {headers: authHeader()})
        return response.data;
    },

    async readOrders() {
        const response = await axios.get("/order", {headers: authHeader()})
        return response.data;
    },

    async readOrder(orderId) {
        const response = await axios.get("/order/" + orderId, {headers: authHeader()})
        return response.data;
    },




};

export default apiOrderClient;
import axios from "axios";
import authHeader from "@/services/auth-header";

const apiCartClient = {

    async getCart() {
        const response = await axios.get("/cart", {headers: authHeader()})
        return response.data;
    },

    async updateCart(requestData) {
        const response = await axios.post("/cart", requestData, {headers: authHeader()})
        console.debug('Sending post request to server', requestData);
        console.debug('Getting request from server', response.data);
        return response.data;
    }

};

export default apiCartClient;
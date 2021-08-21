import axios from "axios";
import authHeader from "@/services/auth-header";

const apiCartClient = {

    async getCart() {
        console.log('Sending get cart request');
        const response = await axios.get("/cart", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get cart: ', response);
        return response.data;
    },

    async updateCart(requestData) {
        console.log('Sending update cart request');
        const response = await axios.post("/cart", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    }
};

export default apiCartClient;
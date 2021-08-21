import axios from "axios";
import authHeader from "@/services/auth-header";

const apiOrderClient = {

    async getDataForOrder() {
        console.log('Sending get data for order request');
        const response = await axios.get("/order", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        console.log('Get data for order: ', response);
        return response.data;
    },

    async createOrder(requestData) {
        console.log('Sending create order request');
        const response = await axios.post("/order", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    },

    async readOrders() {
        console.log('Sending get all orders request');
        const response = await axios.get("/order", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get orders: ', response);
        return response.data;
    },

    async readOrder(orderId) {
        console.log('Sending read order for order with id=' , orderId);
        const response = await axios.get("/order/" + orderId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get order: ', response);
        return response.data;
    },
};

export default apiOrderClient;
import axios from "axios";
import authHeader from "@/services/auth-header";

const apiOrderClient = {

    async readOrders() {
        console.log('Sending get all orders request')
        const response = await axios.get("/cms/order", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get orders: ', response.data)
        return response.data;
    },

    async readActiveOrders() {
        console.log('Sending get all active orders request')
        const response = await axios.get("/cms/order/active", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        console.log('Get active orders: ', response.data)
        return response.data;
    },

    async createOrder(requestData) {
        console.log('Sending new order request: ', requestData)
        const response = await axios.post("/cms/order/new", requestData)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        return response.data;
    },

    async readOrder(orderId) {
        console.log('Sending get order request for order with id=', orderId)
        const response = await axios.get("/cms/order/" + orderId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get order: ', response.data)
        return response.data;
    },

    async deleteOrder(orderId) {
        console.log('Sending delete order request for order with id=', orderId)
        const response = await axios.delete("/cms/order/" + orderId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        return response.data;
    },

    async updateOrder(orderId, requestData) {
        console.log('Sending update order request:', requestData)
        const response = await axios.patch("/cms/order/" + orderId, requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        return response.data;
    },

    async updateOrderStatus(orderId, requestData) {
        console.log('Sending update order status request:', requestData)
        const response = await axios.patch("/cms/order/" + orderId+ "/status/", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        return response.data;
    }
};

export default apiOrderClient;
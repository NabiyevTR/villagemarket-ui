import axios from "axios";
import authHeader from "@/services/auth-header";

const apiCustomerClient = {

    async readCustomers() {
        console.log('Sending get all customers request');
        const response = await axios.get("/cms/customer", {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get customers: ', response.data);
        return response.data;
    },

    async readCustomer(userId) {
        console.log('Sending get customer request.');
        const response = await axios.get("/cms/customer/" + userId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        console.log('Get customer: ', response.data);
        return response.data;
    },
};
export default apiCustomerClient;
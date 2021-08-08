import axios from "axios";
import authHeader from "@/services/auth-header";

const apiCustomerClient = {

    async readCustomers() {
        const response = await axios.get("/cms/customer", {headers: authHeader()})
        return response.data;
    },

    async readCustomer(userId) {
        const response = await axios.get("/cms/customer/" + userId, {headers: authHeader()})
        return response.data;
    },


};

export default apiCustomerClient;
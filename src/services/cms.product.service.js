import axios from "axios";
import authHeader from "@/services/auth-header";

const apiProductClient = {

    async readProducts() {
        const response = await axios.get("/cms/product",{headers: authHeader()})
        return response.data;
    },

    async readAvailableProducts() {
        const response = await axios.get("/cms/product/available",{headers: authHeader()})
        return response.data;
    },

    async createProduct(requestData) {
        const response = await axios.post("/cms/product/", requestData, {headers: authHeader()})
        return response.data;
    },

    async readProduct(productId) {
        const response = await axios.get("/cms/product/" + productId,{headers: authHeader()})
        return response.data;
    },

    async deleteProduct(productId) {
        const response = await axios.delete("/cms/product/" + productId, {headers: authHeader()})
        return response.data;
    },

    async updateProduct(requestData) {
        const response = await axios.patch("/cms/product/" + requestData.id + "/edit/", requestData, {headers: authHeader()})
        return response.data;
    }
};

export default apiProductClient;
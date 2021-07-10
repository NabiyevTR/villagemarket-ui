import axios from "axios";

const apiClient = {

    async readProducts() {
        const response = await axios.get("/products")
        return response.data;
    },

    async createProduct(requestData) {
        const response = await axios.post("/products/new", requestData)
        return response.data;
    },

    async readProduct(productId) {
        const response = await axios.get("/products/" + productId)
        return response.data;
    },

    async deleteProduct(productId) {
        const response = await axios.delete("/products/" + productId)
        return response.data;
    },

    async updateProduct(productId, requestData) {
        const response = await axios.patch("/products/" + productId, requestData)
        return response.data;
    }
};

export default apiClient;
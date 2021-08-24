import axios from "axios";
import authHeader from "@/services/auth-header";

const apiProductClient = {

    async readProducts() {
        console.log('Sending get all products request');
        const response = await axios.get("/cms/product",{headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get products: ', response.data);
        return response.data;
    },

    async readAvailableProducts() {
        console.log('Sending get all active products request');
        const response = await axios.get("/cms/product/available",{headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get available products: ', response.data);
        return response.data;
    },

    async createProduct(requestData) {
        console.log('Sending create product request: ', requestData);
        const response = await axios.post("/cms/product/", requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    },

    async readProduct(productId) {
        console.log('Sending get product request for product with id=', productId);
        const response = await axios.get("/cms/product/" + productId,{headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get product: ', response.data);
        return response.data;
    },

    async readProductLastMonthSales(productId) {
        console.log('Sending get product last month sales request for product with id=', productId);
        const response = await axios.get("/cms/product/" + productId + "/sales/month",{headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get last product last month sales: ', response);
        return response.data;
    },

    async deleteProduct(productId) {
        console.log('Sending delete product request for product with id=', productId);
        const response = await axios.delete("/cms/product/" + productId, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        return response.data;
    },

    async updateProduct(requestData) {
        console.log('Sending update product request: ', requestData);
        const response = await axios.patch("/cms/product/" + requestData.id, requestData, {headers: authHeader()})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            })
        return response.data;
    }
};

export default apiProductClient;
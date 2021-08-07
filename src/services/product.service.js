import axios from "axios";

const apiProductClient = {


    async readProducts() {
        const response = await axios.get("/product")
        return response.data;
    },

    async readProductsWithCategory(category) {
        const response = await axios.get("/product/category/" + category)
        return response.data;
    },

    async readProduct(productId) {
        const response = await axios.get("/product/" + productId)
        return response.data;
    },

};

export default apiProductClient;
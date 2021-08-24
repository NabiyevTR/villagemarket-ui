import axios from "axios";

const apiProductClient = {

    async readProducts() {
        console.log('Sending get all products request');
        const response = await axios.get("/product")
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get products: ', response.data);
        return response.data;
    },

    async readProductsWithCategory(category) {
        console.log('Sending get all products request with category ', category);
        const response = await axios.get("/product/category/" + category)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get products by category: ', response.data);
        return response.data;
    },

    async readProduct(productId) {
        console.log('Sending get product request for product with id=', productId);
        const response = await axios.get("/product/" + productId)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    return error.response;
                }
            });
        console.log('Get product: ', response.data);
        return response.data;
    },
};

export default apiProductClient;
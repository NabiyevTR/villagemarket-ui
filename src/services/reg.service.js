import axios from "axios";

const apiUserClient = {


    async registerUser(requestData) {
        const response = await axios.post("/registration", requestData)
        return response.data;
    },


};

export default apiUserClient;
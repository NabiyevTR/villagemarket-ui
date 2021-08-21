import axios from "axios";

const apiUserClient = {

    async registerUser(requestData) {
        console.log('Sending register user request: ' , requestData);
        const response = await axios.post("/registration", requestData)
            .catch(function (error) {
            if (error.response) {
                console.log(error.response);
                return error.response;
            }
        })
        return response.data;
    },
};

export default apiUserClient;
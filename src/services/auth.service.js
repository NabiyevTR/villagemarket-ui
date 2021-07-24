import axios from "axios";

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password

            })
            .then(response => {
               if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,

            firstName: user.firstName,
            lastName: user.lastName,

            gender: user.gender,
            address: user.address,
            birthDate: user.birthDate
        });
    }
}

export default new AuthService();
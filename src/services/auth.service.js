import axios from "axios";
import store from "../store"
import router from "@/router";

const API_URL = 'https://ntr-village-market.herokuapp.com/api/auth/'
//const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password

            })
            .then(response => {
                console.debug('Login response: ', response.data)
               if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    store.dispatch('cart/loadCart')
                        .then(() => console.debug('Cart is ready'));
                }
                return response.data;
            }).catch(response => {
                console.debug('Login response(error): ', response.data)
                return response.data;

            })
    }

    logout() {
        localStorage.removeItem('user');
        store.dispatch('cart/clearCart').then(()=>console.debug('Cart was cleared'));
        router.push("/").then(() => console.debug("Pushed to main page after logout: "))
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

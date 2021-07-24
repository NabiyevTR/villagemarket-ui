import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import store from './store';

//axios
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://localhost:8080/api"

Vue.config.productionTip = false


//axios
Vue.use(VueAxios, axios)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

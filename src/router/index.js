import Vue from 'vue'
import VueRouter from "vue-router";

import Products from '../components/Products.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Products',
        component: Products
    }
]

const router = new VueRouter({
    routes
})

export default router
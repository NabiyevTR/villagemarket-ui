import Vue from 'vue'
import VueRouter from "vue-router";

// Common pages
import Products from '../components/shop/ProductsPage.vue'

//Auth pages
import Login from "@/components/auth/Login";


Vue.use(VueRouter)

const routes = [

    //Common
    {
        path: '/product',
        name: 'Products',
        component: Products
    },

    //auth
    {
        path: '/login',
        name: 'Login',
        component: Login

    },

    //CMS
    {
        path: '/cms/product',
        name: 'CMSProductsPage',
        component: () => import('../components/cms/products/ProductsPage')
    },

    {
        path: '/cms/product/new',
        name: 'CMSAddProductPage',
        component: () => import('../components/cms/products/AddProductPage')
    },

    {
        path: '/cms/product/:productId/edit',
        name: 'CMSEditProductPage',
        component: () => import('../components/cms/products/EditProductPage'),
        props: true
    },

    {
        path: '/cms/order',
        name: 'Orders',
        component: Products
        /*TODO change to Orders*/
    },

    {
        path: '/cms/user',
        name: 'Users',
        component: Products
        /*TODO change to Users*/
    },


    // OTHER ROUTES
    /*{
        path: '*',
        redirect: '/'
        /!*name: 'Error',
        // component: () => import('@/pages/Error') (Optional)
        meta: {
            layout: 'error' // name of the layout
        }*!/
    }*/

]


const router = new VueRouter({
    routes,
    mode: 'history',
    history: true,
    //TODO delete if not necessary
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
})

router.beforeEach((to, from, next) => {

    const publicPages = [
        '/login',
        '/',
        '/recipe',
        '/blog',
        '/contact',
        '/product'
    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
})



export default router
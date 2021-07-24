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
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../components/shop/Cart')
    },
    {
        path: '/order/new',
        name: 'NewOrderPage',
        component: () => import('../components/shop/NewOrderPage')
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
        name: 'CMSUsers',
        component: () => import('../components/cms/users/UsersPage')
    },
    {
        path: '/cms/user/new',
        name: 'CMSAddUserPage',
        component: () => import('../components/cms/users/AddUserPage')
    },
    {
        path: '/cms/user/:userId/edit',
        name: 'CMSEditUserPage',
        component: () => import('../components/cms/users/EditUserPage'),
        props: true
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
        '/cart',
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
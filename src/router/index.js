import Vue from 'vue'
import VueRouter from "vue-router";


//Home page
import HomePage from "@/components/home/HomePage";

//Products page
import ProductsPage from "@/components/shop/ProductsPage";

//Auth pages
import Login from "@/components/auth/Login";


Vue.use(VueRouter)

const routes = [

    // Common
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
        meta: {title: 'VillageMarket'}
    },

    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: {title: 'VillageMarket'}
    },

    {
        path: '/product',
        name: 'Products',
        component: ProductsPage,
        meta: {title: 'Shop - VillageMarket'}
    },

    {
        path: '/product/fruits',
        name: 'Products',
        component: ProductsPage,
        props: { category: 'fruits' },
        meta: {title: 'Shop - VillageMarket'}
    },

    {
        path: '/product/vegetables',
        name: 'Products',
        component: ProductsPage,
        props: { category: 'vegetables' },
        meta: {title: 'Shop - VillageMarket'}
    },

    {
        path: '/about',
        name: 'AboutUsPage',
        component: () => import('../components/about/AboutUsPage'),
        meta: {title: 'About Us - VillageMarket'}
    },

    {
        path: '/contacts',
        name: 'ContactUSPage',
        component: () => import('../components/contacts/ContactUsPage'),
        meta: {title: 'Contacts - VillageMarket'}
    },

    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../components/shop/Cart'),
        meta: {title: 'Cart - VillageMarket'}
    },

    {
        path: '/order/new',
        name: 'NewOrderPage',
        component: () => import('../components/shop/NewOrderPage'),
        meta: {title: 'Order - VillageMarket'}
    },

    // Auth
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {title: 'Login - VillageMarket'}
    },

    // Registration
    {
        path: '/registration',
        name: 'RegistrationPage',
        component: () => import('../components/auth/RegistrationPage'),
        meta: {title: 'Registration - VillageMarket'}
    },

    //Profile
    {
        path: '/profile',
        name: 'UserProfilePage',
        component: () => import('../components/profile/UserProfilePage'),
        meta: {title: 'Profile - VillageMarket'}
    },

    {
        path: '/profile/edit',
        name: 'EditUserProfilePage',
        component: () => import('../components/profile/EditUserProfilePage'),
        meta: {title: 'Edit profile - VillageMarket'}
    },

    //CMS Products
    {
        path: '/cms/product',
        name: 'CMSProductsPage',
        component: () => import('../components/cms/products/ProductsPage'),
        meta: { title: 'Products - VillageMarket' }
    },

    {
        path: '/cms/product/new',
        name: 'CMSAddProductPage',
        component: () => import('../components/cms/products/AddProductPage'),
        meta: { title: 'New product - VillageMarket' }

    },

    {
        path: '/cms/product/:productId',
        name: 'CMSProductPage',
        component: () => import('../components/cms/products/ProductPage'),
        props: true,
        meta: { title: 'Product - VillageMarket' }
    },

    {
        path: '/cms/product/:productId/edit',
        name: 'CMSEditProductPage',
        component: () => import('../components/cms/products/EditProductPage'),
        props: true,
        meta: { title: 'Edit product - VillageMarket' }
    },

    //CMS Customers

    {
        path: '/cms/customer',
        name: 'CMSCustomersPage',
        component: () => import('../components/cms/customers/CustomersPage'),
        meta: { title: 'Customers - VillageMarket' }
    },

    {
        path: '/cms/customer/:customerId',
        name: 'CMSCustomerPage',
        component: () => import('../components/cms/customers/CustomerPage'),
        props: true,
        meta: { title: 'Customer - VillageMarket' }
    },


    //CMS Orders

    {
        path: '/cms/order',
        name: 'CMSOrdersPage',
        component: () => import('../components/cms/orders/OrdersPage'),
    },

    {
        path: '/cms/order/:orderId',
        name: 'CMSOrderPage',
        component: () => import('../components/cms/orders/OrderPage'),
        props: true
    },

    {
        path: '/cms/user',
        name: 'CMSUsersPage',
        component: () => import('../components/cms/users/UsersPage')
    },

    // CMS Users

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
        '/registration',
        '/',
        '/home',
        '/about',
        '/contacts',
        '/cart',
        '/product',
        '/product/fruits',
        '/product/vegetables',

    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    document.title = to.meta.title || 'VillageMarket';

    if (authRequired && !loggedIn) {
        localStorage.setItem("targetPage", to.path)
        return next('/login');
    }

    next();

})


export default router
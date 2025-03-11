import Layout from "../pages/layouts/layout.vue";
import Home from "../pages/clients/Home/index.vue";
import ProduceTemplate from "../pages/clients/Product/index.vue";
import Product from "../pages/clients/Product/Product.vue";
import Cart from "../pages/clients/Cart/index.vue";
import Login from "../pages/logins/Login.vue";
import Register from "../pages/logins/Register.vue";
const client = [
    {   
        path: '/',
        component: Layout,
        children: [
            {
                title: 'Home',
                path: '',
                name: 'Home',
                component: Home,
                meta: {
                    title: 'Trang chủ',
                },
            },
            {   
                title: 'ProduceTemplate',
                path: 'produce',
                component: ProduceTemplate,
                name: 'ProduceTemplate',
                meta: {
                    title: 'Sản phẩm',
                },
                children: [
                    {
                        title: 'Produce1',
                        path: 'produce1',
                        name: 'Produce1',
                        component: Product,
                        meta: {
                            title: 'Produce1',
                        },
                    },
                    {
                        title: 'Produce2',
                        path: 'produce2',
                        name: 'Produce2',
                        component: Product,
                        meta: {
                            title: 'Produce2',
                        },
                    },
                    {
                        title: 'Produce3',
                        path: 'produce3',
                        name: 'Produce3',
                        component: Product,
                        meta: {
                            title: 'Produce3',
                        },
                    },
                ]
            },
            {   
                title: 'Cart',
                path: 'cart',
                component: Cart,
                name: 'Cart',
                meta: {
                    title: 'Giỏ hàng',
                },
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    }
]

export default client;
import Layout from "../pages/layouts/layout.vue";
import Home from "../pages/clients/Home/index.vue";
import ProductDetail from "../pages/clients/ProductDetail/index.vue";
import RouterListProduct from "../pages/clients/ListProduct/index.vue";
import ListProduct from "@/components/clients/ListProduct/ListProduct.vue";
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
                title: 'RouterListProduct',
                path: 'product',
                component: RouterListProduct,
                name: 'RouterListProduct',
                meta: {
                    title: 'Sản phẩm',
                },
                children: [
                    {
                        title: 'ListProduct',
                        path: '', 
                        name: 'ListProduct',
                        component: ListProduct,
                        meta: {
                            title: 'Trí tuệ nhân tạo - Tích hợp'
                        }
                    },
                    {
                        title: 'ProductDetail',
                        path: 'produce1',
                        name: 'ProductDetail',
                        component: ProductDetail,
                        meta: {
                            title: 'ProductDetail',
                        },
                    },
                //     {
                //         title: 'Produce2',
                //         path: 'produce2',
                //         name: 'Produce2',
                //         component: Product,
                //         meta: {
                //             title: 'Produce2',
                //         },
                //     },
                //     {
                //         title: 'Produce3',
                //         path: 'produce3',
                //         name: 'Produce3',
                //         component: Product,
                //         meta: {
                //             title: 'Produce3',
                //         },
                //     },
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
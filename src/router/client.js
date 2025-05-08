import Layout from "../pages/layouts/layout.vue";
import Home from "../pages/clients/Home/index.vue";
import ProductDetail from "../pages/clients/ProductDetail/index.vue";
import CategoryRouter from "../pages/clients/ListProduct/index.vue";
import Category from "../pages/clients/Category/index.vue";
import ListProduct from "@/components/clients/ListProduct/ListProduct.vue";
import Cart from "../pages/clients/Cart/index.vue";
import Order from "../pages/clients/Order/index.vue";
import OrderDetail from "../components/clients/Order/OrderDetail.vue";
import ListOrder from "../components/clients/Order/index.vue";
import Login from "../pages/logins/Login.vue";
import User from "../pages/clients/User/index.vue"
import Register from "../pages/logins/Register.vue";
const client = [
    {   
        path: '/',
        component: Layout,
        meta: { layout: 'client' },
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
                title: 'CategoryRouter',
                path: 'category',
                component: CategoryRouter,
                name: 'CategoryRouter',
                meta: {
                    title: 'Mục lục',
                },
                children: [
                    {
                        title: 'Category',
                        path: '', 
                        name: 'Category',
                        component: Category,
                        meta: {
                            title: 'Mục lục'
                        }
                    },
                    {
                        title: 'Education',
                        path: 'education',
                        name: 'Education',
                        component: ListProduct,
                        meta: {
                            title: 'Giáo dục'
                        }
                    },
                    {
                        title: 'LifeSkills',
                        path: 'life-skills',
                        name: 'LifeSkills',
                        component: ListProduct,
                        meta: {
                            title: 'Kỹ năng sống'
                        }
                    },
                    {
                        title: 'Business',
                        path: 'business',
                        name: 'Business',
                        component: ListProduct,
                        meta: {
                            title: 'Kinh doanh'
                        }
                    },
                    {
                        title: 'Entertainment',
                        path: 'entertainment',
                        name: 'Entertainment',
                        component: ListProduct,
                        meta: {
                            title: 'Giải trí'
                        }
                    },
                    {
                        title: 'Academic',
                        path: 'academic',
                        component: ListProduct,
                        meta: {
                            title: 'Học thuật'
                        }
                    },
                    {
                        title: 'Lifestyle',
                        path: 'lifestyle',
                        name: 'Lifestyle',
                        component: ListProduct,
                        meta: {
                            title: 'Đời sống'
                        }
                    },
                    {
                        title: 'ProductDetail',
                        path: 'product/:id',
                        name: 'ProductDetail',
                        component: ProductDetail,
                        meta: {
                            title: 'ProductDetail',
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
            {   
                title: 'User',
                path: 'user',
                component: User,
                name: 'User',
                meta: {
                    title: 'Người dùng',
                },
            },
            {   
                title: 'Order',
                path: 'order-history',
                component: Order,
                name: 'OrderHistory',
                meta: {
                    title: 'Đơn hàng',
                },
                children: [
                    {
                        title: 'ListOrder',
                        path: '',
                        name: 'ListOrder',
                        component: ListOrder,
                        meta: {
                            title: 'Danh sách đơn hàng',
                        },
                    },
                    {
                        title: 'OrderDetail',
                        path: 'order-detail/:id',
                        name: 'OrderDetail',
                        component: OrderDetail,
                        meta: {
                            title: 'Chi tiết đơn hàng',
                        },
                    }
                ]
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
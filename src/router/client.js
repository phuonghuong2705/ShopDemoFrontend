import Layout from "../pages/layouts/layout.vue";
import Home from "../pages/clients/Home/index.vue";
import ProductDetail from "../pages/clients/ProductDetail/index.vue";
import CategoryRouter from "../pages/clients/ListProduct/index.vue";
import Category from "../pages/clients/Category/index.vue";
import ListProduct from "@/components/clients/ListProduct/ListProduct.vue";
import Cart from "../pages/clients/Cart/index.vue";
import Order from "../pages/clients/Order/index.vue";
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
                        title: 'Novel',
                        path: 'novel', 
                        name: 'Novel',
                        component: ListProduct,
                        meta: {
                            title: 'Tiểu thuyết'
                        }
                    },
                    {
                        title: 'ShortStory',
                        path: 'short-story', 
                        name: 'ShortStory',
                        component: ListProduct,
                        meta: {
                            title: 'Truyện ngắn'
                        }
                    },
                    {
                        title: 'Poetry',
                        path: 'poetry', 
                        name: 'Poetry',
                        component: ListProduct,
                        meta: {
                            title: 'Thơ'
                        }
                    },
                    {
                        title: 'NaturalScience',
                        path: 'natural-science', 
                        name: 'NaturalScience',
                        component: ListProduct,
                        meta: {
                            title: 'Khoa học tự nhiên'
                        }
                    },
                    {
                        title: 'SocialScience',
                        path: 'social-science',
                        name: 'SocialScience',
                        component: ListProduct,
                        meta: {
                            title: 'Khoa học xã hội'
                        }
                    },
                    {
                        title: 'SchoolBook',
                        path: 'school-book',
                        name: 'SchoolBook',
                        component: ListProduct,
                        meta: {
                            title: 'Sách giáo khoa'
                        }
                    },
                    {
                        title: 'Psychology',
                        path: 'psychology',
                        name: 'Psychology',
                        component: ListProduct,
                        meta: {
                            title: 'Tâm lý học'
                        }
                    },
                    {
                        title: 'SeftHelp',
                        path: 'seft-help',
                        name: 'SeftHelp',
                        component: ListProduct,
                        meta: {
                            title: 'Phát triển bản thân'
                        }
                    },
                    {
                        title: 'EconomicsAndFinance',
                        path: 'economics-finance',
                        name: 'EconomicsAndFinance',
                        component: ListProduct,
                        meta: {
                            title: 'Kinh tế và Tài chính'
                        }
                    },
                    {
                        title: 'History',
                        path: 'history',
                        name: 'History',
                        component: ListProduct,
                        meta: {
                            title: 'Lịch sử'
                        }
                    },
                    {
                        title: 'CookBook',
                        path: 'cook-book',
                        name: 'CookBook',
                        component: ListProduct,
                        meta: {
                            title: 'Sách nấu ăn'
                        }
                    },
                    {
                        title: 'Comic',
                        path: 'comic',
                        name: 'Comic',
                        component: ListProduct,
                        meta: {
                            title: 'Truyện tranh'
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
import Layout from "../pages/layouts/layout.vue";
import Dashboard from "../pages/admins/Dashboard/index.vue";
// import Produce from "../pages/produce/index.vue";
// import Cart from "../pages/cart/index.vue";
const admin = [
    {   
        path: '/',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: 'Trang chủ',
                },
            },
        ]
    },
]

export default admin;
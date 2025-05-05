import Layout from "../pages/layouts/layout.vue";
import Dashboard from "../pages/admins/Dashboard/index.vue";
import Product from "../pages/admins/Product/index.vue";
import ListProduct from "@/components/admins/Product/ListProduct.vue";
import CreateUpdateProduct from "@/components/admins/Product/CreateUpdateProduct.vue";
import Employee from "../pages/admins/Employee/index.vue";
import Customer from "../pages/admins/Customer/index.vue";
import Order from "../pages/admins/Customer/index.vue";
import { useAuthStore } from '@/stores/auth';
const admin = [
    {   
        path: '/',
        component: Layout,
        meta: { layout: 'admin' },
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            authStore.getUser().then(res => {
                if (res?.type !== 'user') {
                    // Không phải user thì chuyển hướng (ví dụ về trang chủ hoặc trang 403)
                    next({ name: 'Home' }); // hoặc redirect về trang phù hợp
                } else  {
                    next();
                }
            }).catch(err => {
                // Nếu không lấy được thông tin người dùng, có thể là chưa đăng nhập
                // Chuyển hướng về trang đăng nhập hoặc trang 403
                next({ name: 'Login' }); // hoặc redirect về trang phù hợp
            });
        },
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: 'Trang chủ',
                },
            },
            {
                path: 'product',
                component: Product,
                children: [
                    {
                        path: '',
                        title: 'ListProduct',
                        name: 'ListProduct',
                        component: ListProduct,
                        meta: {
                            title: 'Danh sách sản phẩm',
                        },
                    },
                    {
                        path: 'create',
                        title: 'CreateProduct',
                        name: 'CreateProduct',
                        component: CreateUpdateProduct,
                        meta: {
                            title: 'Thêm sản phẩm',
                        },
                    },
                    {
                        path: 'update/:id',
                        title: 'UpdateProduct',
                        name: 'UpdateProduct',
                        component: CreateUpdateProduct,
                        meta: {
                            title: 'Cập nhật sản phẩm',
                        },
                        beforeEnter: (to, from, next) => {
                            if (to.params.id) {
                                next();
                            } else {
                                next({name: 'ListProduct'});
                            }
                        }
                    }
                ],
            },
            {
                path: 'employee',
                title: 'Employee',
                name: 'Employee',
                component: Employee,
                meta: {
                    title: 'Nhân viên',
                },
            },
            {
                path: 'customer',
                title: 'Customer',
                name: 'Customer',
                component: Customer,
                meta: {
                    title: 'Khách hàng',
                },
            },
            {
                path: 'order',
                title: 'Order',
                name: 'Order',
                component: Order,
                meta: {
                    title: 'Đơn hàng',
                },
            },
        ]
    },
]

export default admin;
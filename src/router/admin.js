import Layout from "../pages/layouts/layout.vue";
import Dashboard from "../pages/admins/Dashboard/index.vue";
import Product from "../pages/admins/Product/index.vue";
import ListProduct from "@/components/admins/Product/ListProduct.vue";
import CreateUpdateProduct from "@/components/admins/Product/CreateUpdateProduct.vue";
import Employee from "../pages/admins/Employee/index.vue";
import Customer from "../pages/admins/Customer/index.vue";
import Order from "../pages/admins/Customer/index.vue";
const admin = [
    {   
        path: '/',
        component: Layout,
        meta: { layout: 'admin' },
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
                        path: 'update',
                        title: 'UpdateProduct',
                        name: 'UpdateProduct',
                        component: CreateUpdateProduct,
                        meta: {
                            title: 'Cập nhật sản phẩm',
                        },
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
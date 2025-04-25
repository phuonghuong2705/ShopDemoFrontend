<template>
    <div class="content">
        <a-card hoverable @click="redirectTo('ListProduct')" class="feature-card">
            <template #title><span class="title">Sản phẩm</span></template>
            <template #extra><ShopOutlined /></template>
            <p>Quản lý danh sách sản phẩm đang kinh doanh, bao gồm thông tin, giá cả, tồn kho và trạng thái hiển thị.</p>
        </a-card>
        <a-card hoverable class="feature-card">
            <template #title><span class="title">Nhân viên</span></template>
            <template #extra><AuditOutlined /></template>
            <p>Quản lý tài khoản nhân sự, phân quyền và theo dõi hoạt động làm việc của từng nhân viên trong hệ thống.</p>
        </a-card>
        <a-card hoverable class="feature-card">
            <template #title><span class="title">Đơn hàng</span></template>
            <template #extra><ShoppingOutlined /></template>
            <p>Hiển thị thông tin các đơn đặt hàng, trạng thái giao hàng, xử lý thanh toán và quản lý khiếu nại nếu có.</p>
        </a-card>
        <a-card hoverable class="feature-card">
            <template #title><span class="title">Khách hàng</span></template>
            <template #extra><UserOutlined /></template>
            <p>Danh sách người dùng, thông tin liên hệ, lịch sử mua hàng và mức độ tương tác với hệ thống.</p>
        </a-card>
        <a-card hoverable class="feature-card">
            <template #title><span class="title">Quản lý website</span></template>
            <template #extra><SettingOutlined /></template>
            <p>Cấu hình giao diện, nội dung trang chủ, banner, tin tức và các thành phần tĩnh khác của trang web.</p>
        </a-card>
        <a-card hoverable class="feature-card">
            <template #title><span class="title">Thống kê</span></template>
            <template #extra><LineChartOutlined /></template>
            <p>Tổng hợp dữ liệu doanh thu, số lượng đơn hàng, lượt truy cập, giúp theo dõi hiệu quả kinh doanh và vận hành.</p>
        </a-card>

    </div>
</template>
<script setup>
import { AuditOutlined, ShopOutlined, SettingOutlined, LineChartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons-vue';
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const redirectTo = (name) => {
    router.push({
        name: name,
    });
}
</script>
<style lang="scss" scoped>
    .content{
        padding: 80px;
        display: flex;
        gap: 40px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .feature-card{
            width: 30%;
            .title{
                font-weight: 600;
                font-size: 20px;
            }
        }
    }
</style>
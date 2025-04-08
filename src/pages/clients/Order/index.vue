<template>
    <div class="content">
        <div class="shopping-cart">
            <div class="filter-box">
                <a-input v-model:value="value" placeholder="Tìm kiếm theo mã đơn hàng" />
                <a-range-picker
                    v-model:value="value4"
                    style="width: 400px"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    :show-time="false"
                    format="YYYY-MM-DD HH:mm:ss"
                />
            </div>
            <a-config-provider>
                <a-table 
                    :columns="columns" 
                    :data-source="listProduct" 
                    bordered
                    :pagination="{
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showLessItems: true,
                        showSizeChanger: false,
                        onChange: handlePageChange,
                    }"
                    class="cart"
                >
                    <template #title><span class="title-form">Danh sách đơn hàng</span></template>
                    <template #bodyCell="{ column, text, index, record }">
                        <template v-if="column.dataIndex === 'stt'">
                            {{ index + 1 }}
                        </template>
                        <template v-if="column.dataIndex === 'order_id'">
                            <a>{{ text }}</a>
                        </template>
                        <template v-if="column.dataIndex === 'create_date'">
                            {{ record.create_date }}
                        </template>
                        <template v-if="column.dataIndex === 'is_paid'">
                            {{ record.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a-button type="link">Xem chi tiết</a-button>
                        </template>
                    </template>
                </a-table>
                <template #renderEmpty>Chưa có đơn hàng</template>
            </a-config-provider>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const current = ref(1);
const pageSize = 1;
const total = 10; // tổng số đơn hàng

const handlePageChange = (page) => {
    current.value = page;
    // gọi API fetch dữ liệu theo trang nếu có
    console.log('Trang hiện tại:', page);
};

const columns = ref([
    {
        title: 'STT',
        dataIndex: 'stt',
    },
    {
        title: 'Mã đơn hàng',
        dataIndex: 'order_id',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'create_date',
    },
    {
        title: 'Thanh toán',
        dataIndex: 'is_paid',
        width: '140px'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: '',
        dataIndex: 'action',
        width: '100px'
    },
]);
const listProduct = ref([
    {
        order_id: 'John Brown',
        create_date: 1,
        is_paid: true,
        status: 1,
    },
    {
        order_id: 'Jim Green',
        create_date: 2,
        is_paid: false,
        status: 1,
    },
    {
        order_id: 'Joe Black',
        create_date: 1,
        is_paid: true,
        status: 0,
    },
]);
</script>
<style lang="scss" scoped>
    .content{
        display: flex;
        justify-content: center;
        .shopping-cart{
            margin-top: 20px;
            background-color: white;
            height: fit-content;
            display: flex;
            color: black;
            flex-direction: column;
            border-radius: 8px;
            padding: 20px;
            align-items: start;
            .filter-box{
                width: 100%;
                gap: 20px;
                display: flex;
                padding: 0px 20px 0px 20px;
            }
            .cart{
                width: 900px;
                padding: 20px;
                background-color: white;
                border-radius: 8px;
            }
            .shipping-infomation{
                background-color: white;
                padding: 20px;
                width: 400px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }
            :deep(.ant-empty){
                margin-inline: 0;
            }
        }
    }
    :deep(.title-form){
        font-weight: 600;
        font-size: 16px;
    }
    :deep(.ant-pagination-item-link){
        display: flex;
    }
</style>
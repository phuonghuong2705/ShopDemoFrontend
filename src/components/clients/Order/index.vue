<template>
    <div class="content">
        <div class="shopping-cart">
            <div class="filter-box">
                <a-input v-model:value="search" @change="handleSearchChange" placeholder="Tìm kiếm theo mã đơn hàng" />
                <a-range-picker
                    v-model:value="dateRange"
                    style="width: 400px"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledRangeTime"
                    :show-time="false"
                    format="DD-MM-YYYY"
                    placeholder="Chọn thời gian"
                />
            </div>
            <a-config-provider>
                <a-table 
                    :columns="columns" 
                    :data-source="listOrder" 
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
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'order_id'">
                            <a>{{ text }}</a>
                        </template>
                        <template v-if="column.dataIndex === 'total_price'">
                            {{ filters.normalizeNumber(record.total_price + record.custom_fee) }}đ
                        </template>
                        <template v-if="column.dataIndex === 'payment_type'">
                            {{ record.payment_type == 'cash' ? 'Thanh toán khi nhận hàng' : record.payment_type == 'bank_transfer' ? 'Chuyển khoản ngân hàng' : record.payment_type == 'credit_card' ? 'Thẻ tín dụng' : record.payment_type  }}
                        </template>
                        <template v-if="column.dataIndex === 'status'">
                            <a-tag :color="record.status == 'Completed' ? 'green' : record.status == 'Cancel' ? 'red' : record.status == 'Pending' ? 'blue' : 'yelow'">
                                {{ record.status == 'Completed' ? 'Hoàn thành' : record.status == 'Cancel' ? 'Hủy' : record.status == 'Pending' ? 'Đang chờ' : 'Đang xử lý' }}
                            </a-tag>
                        </template>
                        <template v-if="column.dataIndex === 'payment_status'">
                            <a-tag :color="record.payment_status == 'paid' ? 'green' : record.payment_status == 'failed' ? 'red' : record.payment_status == 'pending' ? 'blue' : 'yelow'">
                                {{ record.stapayment_statustus == 'Completed' ? 'Hoàn thành' : record.payment_status == 'Cancel' ? 'Thất bại' : record.payment_status == 'Pending' ? 'Đang chờ' : 'Đang xử lý' }}
                            </a-tag>
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a-button type="link" @click="redirectToDetail(record.id)">Xem chi tiết</a-button>
                        </template>
                    </template>
                </a-table>
                <template #renderEmpty>Chưa có đơn hàng</template>
            </a-config-provider>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '@/stores/order';
import _ from 'lodash';
import { useRouter, useRoute } from 'vue-router';
import filters from '@/utils/filters';


const router = useRouter();
const route = useRoute();
const orderStore = useOrderStore();

const current = ref(1);
const pageSize = ref(5);
const total = ref(0); // tổng số đơn hàng
const search = ref(null); // giá trị tìm kiếm
const dateRange = ref({
    start_date: null,
    end_date: null,
}); // giá trị ngày bắt đầu và kết thúc

const columns = ref([
    {
        title: 'Mã đơn hàng',
        dataIndex: 'id',
        width: '100px',
    },
    {
        title: 'Trạng thái đơn hàng',
        dataIndex: 'status',
        width: '180px'
    },
    {
        title: 'Thanh toán',
        dataIndex: 'payment_status',
        width: '140px'
    },
    {
        title: 'Hình thức thanh toán',
        dataIndex: 'payment_type',
        width: '200px'
    },
    {
        title: 'Phương thức vận chuyển',
        dataIndex: 'transport_fee',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'total_price',
        width: '100px'
    },
    {
        title: '',
        dataIndex: 'action',
        width: '60px'
    },
]);
const listOrder = ref([]);


onMounted(() => {
    // gọi API để lấy danh sách đơn hàng
    getListOrder();
});

const handlePageChange = (page, pageSize) => {
    current.value = page;
    pageSize.value = pageSize;
}

const getListOrder = () => {
    let params = {
        page: current.value,
        per_page: pageSize.value,
        start_date: dateRange.value.start_date,
        end_date: dateRange.value.end_date,
        order_id: search.value,
    }
    let filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== null && value !== undefined)
    );
    orderStore.getListOrder(filteredParams).then((res) => {
        console.log(res.data);
        
        listOrder.value = res.data.map((item) => {
            return {
                id: item.id,
                total_price: parseInt(item.total_price),
                payment_status: item.payment_status,
                status: item.status,
                custom_fee: parseInt(item.custom_fee.price),
                payment_type: item.payment_type,
                transport_fee: item.custom_fee.title,
            };
        });
        total.value = res.total;
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
};

const redirectToDetail = (id) => {
    router.push({
        name: 'OrderDetail',
        params: { id: id },
    });
};

const handleSearchChange = _.debounce(() => {
    getListOrder();
}, 500);

</script>
<style lang="scss" scoped>
    .content{
        display: flex;
        justify-content: center;
        .shopping-cart{
            width: 80%;
            min-width: 1000px;
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
                width: 100%;
                min-width: 1000px;
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
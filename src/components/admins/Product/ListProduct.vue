<template>
    <div class="content">
        <a-flex class="background">
            <a-flex style="width: 95%; display: flex; justify-content: space-between;">
                <a-select 
                    placeholder="Sắp xếp theo"
                    :options="options"
                    style="width: 27%"
                    allowClear
                >

                </a-select>
                <a-input-search
                    style="width: 70%"
                    placeholder="Nhập tên hoặc mã sản phẩm"
                >
                </a-input-search>
            </a-flex>
            <a-flex style="width: 95%; display: flex; justify-content: space-between;">
                <span class="title-form">20 sản phẩm</span>
                <a-button type="primary" @click="RedirectCreateform">Thêm sản phẩm</a-button>
            </a-flex>
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
                class="table"
            >
                <template #title>
                    <span class="title-form">Danh sách sản phẩm</span>
                </template>
                <template #bodyCell="{ column, text, index, record }">
                    <template v-if="column.dataIndex === 'stt'">
                        {{ index + 1 }}
                    </template>
                    <template v-if="column.dataIndex === 'id'">
                        {{ record.id }}
                    </template>
                    <template v-if="column.dataIndex === 'product'">
                        {{ record.product }}
                    </template>
                    <template v-if="column.dataIndex === 'is_paid'">
                        {{ record.is_paid ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="link" @click="RedirectUpdateform(record.product)">Xem chi tiết</a-button>
                    </template>
                </template>
            </a-table>
        </a-flex>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pageSize = ref(6);
const getProductRowSpan = (() => {
    const spanMap = {}
    let lastValue = ''
    let count = 0
    return (_, index) => {
        const current = data[index].product
        if (current !== lastValue) {
            count = data.filter((d) => d.product === current).length
            spanMap[current] = count
            lastValue = current
            return { rowSpan: count }
        } else {
            spanMap[current]--
        return { rowSpan: 0 }
        }
    }
})
const columns = ref([
    {
        title: 'STT',
        dataIndex: 'stt',
        width: '50px'
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'id',
        customCell: (record, index) => {
            const product = record.product;
            const data = listProduct.value;

            // Nếu là dòng đầu tiên hoặc khác sản phẩm trước đó thì tính rowSpan
            if (index === 0 || data[index - 1].product !== product) {
                let rowSpan = 1;
                for (let i = index + 1; i < data.length; i++) {
                if (data[i].product === product) {
                    rowSpan++;
                } else {
                    break;
                }
                }
                return { rowSpan };
            }

            // Các dòng giống nhau tiếp theo sẽ bị ẩn ô
            return { rowSpan: 0 };
        },
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
        customCell: (record, index) => {
            const id = record.id;
            const data = listProduct.value;

            // Nếu là dòng đầu tiên hoặc khác sản phẩm trước đó thì tính rowSpan
            if (index === 0 || data[index - 1].id !== id) {
                let rowSpan = 1;
                for (let i = index + 1; i < data.length; i++) {
                if (data[i].id === id) {
                    rowSpan++;
                } else {
                    break;
                }
                }
                return { rowSpan };
            }

            // Các dòng giống nhau tiếp theo sẽ bị ẩn ô
            return { rowSpan: 0 };
        },
    },
    {
        title: 'Phiên bản',
        dataIndex: 'version',
        width: '140px'
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        width: '140px'
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
    },
    {
        title: '',
        dataIndex: 'action',
        width: '100px',
        customCell: (record, index) => {
            const id = record.id;
            const data = listProduct.value;

            // Nếu là dòng đầu tiên hoặc khác sản phẩm trước đó thì tính rowSpan
            if (index === 0 || data[index - 1].id !== id) {
                let rowSpan = 1;
                for (let i = index + 1; i < data.length; i++) {
                if (data[i].id === id) {
                    rowSpan++;
                } else {
                    break;
                }
                }
                return { rowSpan };
            }

            // Các dòng giống nhau tiếp theo sẽ bị ẩn ô
            return { rowSpan: 0 };
        },
    },
]);
const listProduct = ref([
    {
        id: 123,
        product: "Sách 456",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    },
    {
        id: 123,
        product: "Sách 456",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    },
    {
        id: 456,
        product: "Sách 123",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    },
    {
        id: 456,
        product: "Sách 123",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    },
    {
        id: 456,
        product: "Sách 123",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    },
    {
        id: 456,
        product: "Sách 123",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    },
    {
        id: 789,
        product: "Sách 789",
        version: "TIêu chuẩn",
        price: 10000,
        quantity: 50
    }
]);
const options = ref([
    {
        value: 'jack',
        label: 'Jack',
    },
    {
        value: 'lucy',
        label: 'Lucy',
    },
    {
        value: 'tom',
        label: 'Tom',
    },
]);

const RedirectUpdateform = (product) => {
    router.push({
        name: 'UpdateProduct',
        query: {
            ...route.query,
            product: product
        }
    })
}
const RedirectCreateform = () => {
    router.push({
        name: 'CreateProduct',
    })
}

</script>
<style lang="scss" scoped>
    .content{
        color: black;
        display: flex;
        align-content: center;
        justify-content: center;
        width: 100%;
        .background{
            gap: 15px;
            margin-top: 30px;
            padding-top: 30px;
            width: 90%;
            min-width: 1000px;
            background-color: white;
            height: 100%;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .table{
                width: 95%;
            }
        }
    }
    :deep(.title-form){
        font-weight: 600;
        font-size: 16px;
    }
    :deep(.ant-table-title){
        display: flex;
        align-items: center;
        gap: 20px;
    }
</style>
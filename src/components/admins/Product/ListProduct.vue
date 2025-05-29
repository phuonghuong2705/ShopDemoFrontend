<template>
    <div class="content">
        <a-flex class="background">
            <a-flex style="width: 95%; display: flex; justify-content: space-between;" :gap="20">
                <a-select 
                    placeholder="Chọn danh mục"
                    :options="listCategory"
                    style="width: 20%"
                    v-model:value="selectedCategory"
                    allowClear
                    @change="handleCategoryChange"
                >
                </a-select>
                <a-select 
                    placeholder="Chọn thể loại"
                    :options="listSubGender"
                    style="width: 20%"
                    v-model:value="selectedSubGenre"
                    :disabled="!selectedCategory"
                    allowClear
                    @change="handleSubgenreChange"
                >
                </a-select>
                <a-input-search
                    style="width: 60%"
                    placeholder="Nhập tên hoặc mã sản phẩm"
                    v-model:value="search"
                    @change="handleSearchChange"
                >
                </a-input-search>
            </a-flex>
            <a-flex style="width: 95%; display: flex; justify-content: space-between;">
                <span class="title-form">{{ total }} sản phẩm</span>
                <a-button type="primary" @click="RedirectCreateform">Thêm sản phẩm</a-button>
            </a-flex>
            <a-table 
                :columns="columns" 
                :data-source="listProduct" 
                bordered
                :loading="loading"
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
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'id'">
                        {{ record.id }}
                    </template>
                    <template v-if="column.dataIndex === 'product'">
                        {{ record.product }}
                    </template>
                    <template v-if="column.dataIndex === 'price'">
                        {{ record.price }} đ
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="link" @click="RedirectUpdateform(record.id)">Xem chi tiết</a-button>
                    </template>
                </template>
            </a-table>
        </a-flex>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useProductStore } from '@/stores/product';
import _ from 'lodash';
import filter from '@/utils/filters';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const { proxy } = getCurrentInstance();

onMounted(() => {
    getListBookVariant();
    console.log(proxy.$filters);
    
})

const pageSize = ref(6);
const loading = ref(false);
const columns = ref([
    {
        title: 'Mã sản phẩm',
        dataIndex: 'id',
        width: '120px',
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
        dataIndex: 'edition',
        width: '140px'
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        width: '120px'
    },
    {
        title: 'Số lượng',
        dataIndex: 'stock',
        width: '100px',
    },
    {
        title: 'Đã bán',
        dataIndex: 'sold',
        width: '100px',
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
const listProduct = ref([]);
const listCategory = ref([
    {
        value: '1',
        label: 'Giáo dục',
    },
    {
        value: '2',
        label: 'Kỹ năng sống',
    },
    {
        value: '3',
        label: 'Kinh doanh',
    },
    {
        value: '4',
        label: 'Giải trí',
    },
    {
        value: '5',
        label: 'Học thuật',
    },
    {
        value: '6',
        label: 'Đời sống',
    },

]);
const listSubGender = computed(() => {
    if (selectedCategory.value == 1) {
        return [
            {
                value: '1',
                label: 'Sách giáo khoa',
            },
            {
                value: '2',
                label: 'Sách bài tập',
            },
            {
                value: '3',
                label: 'Sách tham khảo',
            },
            {
                value: '4',
                label: 'Sách luyện thi',
            },
            {
                value: '5',
                label: 'Giáo trình đại học',
            },
        ]
    } else if (selectedCategory.value == 2) {
        return [
            {
                value: '6',
                label: 'Phát triển bản thân',
            },
            {
                value: '7',
                label: 'Quản lý thời gian',
            },
            {
                value: '8',
                label: 'Giao tiếp',
            },
            {
                value: '9',
                label: 'Tài chính cá nhân',
            },
            {
                value: '10',
                label: 'Hướng nghiệp',
            }
        ]
    } else if (selectedCategory.value == 3) {
        return [
            {
                value: '11',
                label: 'Khởi nghiệp',
            },
            {
                value: '12',
                label: 'Quản trị doanh nghiệp',
            },
            {
                value: '13',
                label: 'Marketing và bán hàng',
            },
            {
                value: '14',
                label: 'Tài chính và đầu tư',
            },
            {
                value: '15',
                label: 'Quản lý sản phẩm',
            }
        ]
    } else if (selectedCategory.value == 4) {
        return [
            {
                value: '16',
                label: 'Tiểu thuyết',
            },
            {
                value: '17',
                label: 'Truyện tranh',
            },
            {
                value: '18',
                label: 'Nghệ thuật',
            },
            {
                value: '19',
                label: 'Âm nhạc',
            },
            {
                value: '20',
                label: 'Phim ảnh',
            },
        ]
    } else if (selectedCategory.value == 5) {
        return [
            {
                value: '21',
                label: 'Khoa học tự nhiên',
            },
            {
                value: '22',
                label: 'Khoa học xã hội',
            },
            {
                value: '23',
                label: 'Ngôn ngữ học',
            },
            {
                value: '24',
                label: 'Triết học',
            },
            {
                value: '25',
                label: 'Khoa học máy tính',
            },
        ]
    } else if (selectedCategory.value == 6) {
        return [
            {
                value: '26',
                label: 'Ẩm thực',
            },
            {
                value: '27',
                label: 'Chăm sóc sức khỏe',
            },
            {
                value: '28',
                label: 'Chăm sóc gia đình',
            },
            {
                value: '29',
                label: 'Nội thất và thiết kế',
            },
            {
                value: '30',
                label: 'Làm vườn',
            },
        ]
    } else {
        return [];
    }
});
const selectedCategory = ref(null);
const selectedSubGenre = ref(null);
const total = ref(0);
const current = ref(1);
const search = ref(null);
const handlePageChange = (page, pageSize) => {
    current.value = page;
    pageSize.value = pageSize;
}
const handleCategoryChange = (value) => {
    getListBookVariant();
}
const handleSubgenreChange = (value) => {
    getListBookVariant();
}
const handleSearchChange = _.debounce(() => {
    getListBookVariant();
}, 500);
const getListBookVariant = async () => {
    let params = {
        page: current.value,
        pageSize: pageSize.value,
        category_id: selectedCategory.value,
        subgenre_id: selectedSubGenre.value,
        search: search.value,
    }
    let filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== null && value !== undefined)
    );
    loading.value = true;
    await productStore.getListBookVariant(filteredParams)
        .then((res) => {
            listProduct.value = res.data.map((item, index) => {
                return {
                    ...item,
                    id: item.book.id,
                    product: item.book.title,
                    edition: item.edition,
                    price: filter.normalizeNumber(item.price),
                    stock: item.stock,
                    sold: item.sold,
                }
            })
            listProduct.value = listProduct.value.sort((a, b) => a.id - b.id);
            total.value = res.total;
            current.value = res.current_page;
            loading.value = false;
        })
        .catch((err) => {
            message.error(err.message);
            loading.value = false;
        });
}

const RedirectUpdateform = (product) => {
    router.push({
        name: 'UpdateProduct',
        query: {
            ...route.query
        },
        params: {
            id: product,
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
            margin-top: 20px;
            padding-top: 30px;
            width: 90%;
            min-width: 1000px;
            background-color: white;
            height: 103%;
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
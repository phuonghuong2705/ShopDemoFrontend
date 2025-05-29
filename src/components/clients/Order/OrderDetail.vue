<template>
    <div class="shopping-cart">
        <a-config-provider>
            <a-table
                :loading="loadingTable"
                :columns="columns" 
                :data-source="listProduct" 
                bordered
                :pagination="false"
                class="cart"
            >
                <template #title><span class="title-form">Danh sách sản phẩm</span></template>
                <template #bodyCell="{ column, text, index, record }">
                    <template v-if="column.dataIndex === 'id'">
                        {{ record.id }}
                    </template>
                    <template v-if="column.dataIndex === 'product'">
                        <a>{{ record.book_title }}</a>
                    </template>
                    <template v-if="column.dataIndex === 'variant_edition'">
                        {{ record.variant_edition }}
                    </template>
                    <template v-if="column.dataIndex === 'price'">
                        {{ filters.normalizeNumber(record.price) }}đ
                    </template>
                    <template v-if="column.dataIndex === 'total'">
                        {{ filters.normalizeNumber(record.quantity * record.price) }}đ
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="link" @click="createReview(record)">Đánh giá</a-button>
                    </template>
                </template>
            </a-table>
            <template #renderEmpty>Chưa có sản phẩm</template>
        </a-config-provider>

        <div style="display: flex; flex-direction: column; gap: 20px;">
            <a-form
                class="shipping-infomation"
                :label-col="{ span: 7 }" :wrapper-col="{ span: 40 }"
            >
                <a-form-item style="width: 100%;">
                    <div class="title-form">
                        <span class="title-form">Thông tin nhận hàng</span>
                    </div>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item label="Người nhận">
                    {{ shippingInfomation?.recipient_name }}
                </a-form-item>
                <a-form-item label="Số điện thoại">
                    {{ shippingInfomation?.phone }}
                </a-form-item>
                <a-form-item label="Địa chỉ">
                    {{ shippingInfomation?.address }}
                </a-form-item>
            </a-form>
            <a-form
                class="shipping-infomation"
            >
                <a-form-item>
                    <span class="title-form">Thông tin đơn hàng</span>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item class="gap-block">
                    <a-flex vertical>
                        <span style="font-weight: 600;">Hình thức thanh toán</span>
                        {{ paymentType == 'cash' ? 'Thanh toán khi nhận hàng' : paymentType == 'bank_transfer' ? 'Chuyển khoản ngân hàng' : paymentType == 'credit_card' ? 'Thẻ tín dụng' : paymentType  }}
                    </a-flex>
                </a-form-item>
                <a-form-item class="gap-block">
                    <a-flex vertical>
                        <span style="font-weight: 600;">Hình thức vận chuyển</span>
                        {{ customFee?.title }}
                    </a-flex>
                </a-form-item>
                <a-form-item>
                    <div class="order-infomation">
                        <div> {{ listProduct.length }} sản phẩm</div>
                        <div>{{ filters.normalizeNumber(itemsTotal) }}đ</div>
                    </div>
                    <div class="order-infomation">
                        <div>Phí ship</div>
                        <div>{{ filters.normalizeNumber(customFeePrice) }}đ</div>
                    </div>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>Tổng thanh toán</div>
                        <div>{{ filters.normalizeNumber(itemsTotal + customFeePrice) }}đ</div>
                    </div>
                    <a-button type="primary" title="Tính năng hiện không khả dụng, vui lòng liên hệ với shop để được hỗ trợ" :block="true" @click="" :disabled="true">Hủy đơn hàng</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-modal v-model:open="showRatingModal" title="Đánh giá sản phẩm" @ok="handleRatingSubmit" @cancel="handleRatingCancel">
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div>
                    <div style="margin-bottom: 8px;">Đánh giá của bạn:</div>
                    <a-rate v-model:value="ratingValue" allow-half/>
                </div>
                <div>
                    <div style="margin-bottom: 8px;">Nhận xét:</div>
                    <a-textarea v-model:value="ratingComment" placeholder="Nhập nhận xét của bạn" :rows="4" />
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '@/stores/order';
import { useReviewStore } from '@/stores/review';
import { useRouter, useRoute } from 'vue-router';
import filters from '@/utils/filters';

const router = useRouter(); // Sử dụng router để điều hướng
const route = useRoute(); // Sử dụng route để lấy thông tin đường dẫn hiện tại

const orderStore = useOrderStore(); // Sử dụng store đơn hàng
const reviewStore = useReviewStore(); // Sử dụng store đánh giá
const customFee = ref(null);
const customFeePrice = ref(0); // Biến để lưu phí ship
const paymentType = ref(null);
const orderStatus = ref(null); // Biến để lưu trạng thái đơn hàng
const columns = ref([
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
    },
    {
        title: 'Phiên bản',
        dataIndex: 'variant_edition',
    },
    {
        title: 'Số lượng',
        className: 'column-money',
        dataIndex: 'quantity',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
    },
    {
        title: 'Thành tiền',
        dataIndex: 'total',
    },
    {
        title: '',
        dataIndex: 'action',
    },
]);
const listProduct = ref([]);
const shippingInfomation = ref({
    recipient_name: null,
    phone: null,
    address: null,
});
const paymentStatus = ref(0); // Biến để lưu phí ship
const itemsTotal = ref(0); // Biến để lưu tổng tiền của giỏ hàng

const showRatingModal = ref(false); // Biến để điều khiển hiển thị modal đánh giá
const ratingValue = ref(0); // Biến để lưu giá trị đánh giá
const ratingComment = ref(null); // Biến để lưu nhận xét của người dùng

//loading
const loading = ref(false);
const loadingTable = ref(false); // Biến để kiểm tra trạng thái loading khi thêm sản phẩm vào giỏ hàng

onMounted( async () => {
    if (route.params.id) {
        await getDetailOrder(route.params.id); // Gọi API để lấy chi tiết đơn hàng
    }
});

const getDetailOrder = async (id) => {
    await orderStore.getDetailOrder(id).then(res => {
            listProduct.value = res.order_items.map((item, index) => ({
                ...item,
                product: item.book_title,
                quantity: item.quantity,
                price: item.price,
                variant_edition: item.variant_edition,
            }));
            shippingInfomation.value.recipient_name = res.recipient_name;
            shippingInfomation.value.phone = res.phone;
            shippingInfomation.value.address = res.address;
            paymentType.value = res.payment_type;
            customFee.value = res.custom_fee;
            customFeePrice.value = parseInt(res.custom_fee.price);
            paymentStatus.value = res.payment_status;
            itemsTotal.value = parseInt(res.total_price);
            orderStatus.value = res.status;
        }).catch(error => {
            console.log(error);
        });
};

const createReview = async (productId) => {
    console.log(productId);
    
    showRatingModal.value = true;
    let params = {
        product_id: productId,
        rating_value: ratingValue.value,
        rating_comment: ratingComment.value,
    };
    await reviewStore.createReview(orderId, productId, ratingValue, ratingComment).then(res => {
        console.log('Đánh giá thành công:', res);
    }).catch(error => {
        console.log('Lỗi khi gửi đánh giá:', error);
    });
};

const handleRatingSubmit = () => {
    // Xử lý gửi đánh giá ở đây
    console.log('Đánh giá:', ratingValue.value);
    console.log('Nhận xét:', ratingComment.value);
    showRatingModal.value = false; // Đóng modal sau khi gửi đánh giá
};

const handleRatingCancel = () => {
    showRatingModal.value = false; // Đóng modal khi nhấn nút hủy
};

</script>
<style lang="scss" scoped>
    .shopping-cart{
        display: flex;
        color: black;
        flex-direction: row;
        padding: 40px;
        justify-content: center;
        align-items: start;
        gap: 20px;
        .cart{
            padding: 10px;
            border: 1px gainsboro solid;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: white;
            border-radius: 8px;
            width: 60%;
        }
        .shipping-infomation{
            background-color: white;
            padding: 20px;
            width: 400px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 1px gainsboro solid;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .title-form{
                font-weight: 600;
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .gap-block{
                margin-bottom: 10px;
            }
            .order-infomation{
                display: flex;
                justify-content: space-between;
            }

        }
        :deep(.ant-empty){
            margin-inline: 0;
        }
    }
    :deep(.ant-form-item-control-input){
        align-items: flex-start;
    }
    :deep(.ant-form-item-label > label){
        align-items: flex-start;
        font-weight: 600;
    }
    :deep(.ant-form-item){
        margin-bottom: 0;
    }
    :deep(.ant-radio-wrapper){
       width: 100%;
    }
    :deep(.ant-radio-wrapper > span):last-child{
       width: 100%;
    }
    // :deep(.ant-form-item-control-input-content){
    //    display: flex;
    //    justify-content: flex-end;
    // }
    img{
        width: 18px;
        height: 18px;
        object-fit: cover;
    }
</style>
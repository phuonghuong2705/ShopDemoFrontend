<template>
    <div class="shopping-cart">
        <a-config-provider>
            <a-table
                :columns="columns" 
                :data-source="listProduct" 
                bordered
                :pagination="false"
                class="cart"
            >
                <template #title><span class="title-form">Giỏ hàng</span></template>
                <template #bodyCell="{ column, text, index, record }">
                    <template v-if="column.dataIndex === 'stt'">
                        {{ index + 1 }}
                    </template>
                    <template v-if="column.dataIndex === 'product'">
                        <a>{{ text }}</a>
                    </template>
                    <template v-if="column.dataIndex === 'total'">
                        {{ record.quantity * record.price }}
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <a-button type="link">Xóa</a-button>
                    </template>
                </template>
            </a-table>
            <template #renderEmpty>Chưa có sản phẩm</template>
        </a-config-provider>

        <div style="display: flex; flex-direction: column; gap: 20px;">
            <a-form
            v-if="listAddress.length"
                class="shipping-infomation"
                :label-col="{ span: 7 }" :wrapper-col="{ span: 40 }"
            >
                <a-form-item style="width: 100%;">
                    <div class="title-form">
                        <span class="title-form">Thông tin nhận hàng</span>
                        <a-button type="link" @click="openModalChangeAddress = true">Thay đổi</a-button>
                    </div>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item label="Người nhận">
                    {{ addressSelected?.name }}
                </a-form-item>
                <a-form-item label="Số điện thoại">
                    {{ addressSelected?.phone }}
                </a-form-item>
                <a-form-item label="Địa chỉ">
                    {{ addressSelected?.address }}
                </a-form-item>
            </a-form>
            <a-empty
                v-if="!listAddress.length"
                class="shipping-infomation"
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                :image-style="{
                height: '60px',
                }"
            >
                <template #description>
                <span>
                    Chưa có địa chỉ giao hàng
                </span>
                </template>
                <a-button type="primary" @click="visibleModalAddAddress()">Thêm mới địa chỉ</a-button>
            </a-empty>
            <a-form
                class="shipping-infomation"
            >
                <a-form-item>
                    <span class="title-form">Thông tin đơn hàng</span>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item class="gap-block">
                    <span style="font-weight: 600;">Hình thức thanh toán</span>
                    <a-radio-group v-model:value="payment">
                        <a-radio :value="1">
                            Thanh toán khi nhận hàng (COD)
                        </a-radio>
                        <a-radio :value="2">
                            Chuyển khoản ngân hàng
                        </a-radio>
                        <a-radio :value="3">
                            Ví điện tử MoMo
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item class="gap-block">
                    <span style="font-weight: 600;">Hình thức vận chuyển</span>
                    <a-radio-group v-model:value="deliveryType">
                        <a-radio :value="1">
                            <img src="/src/assets/delivery-shipping.svg" alt="">
                            Giao hàng tiêu chuẩn(5-7 ngày)
                        </a-radio>
                        <a-radio :value="2">
                            <img src="/src/assets/delivery-shipping-sp.svg" alt="">
                            Giao hàng hỏa tốc(3-5 ngày)
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item>
                    <div class="order-infomation">
                        <div>Tạm tính ({{ listProduct.length }} sản phẩm)</div>
                        <div>400.000</div>
                    </div>
                    <div class="order-infomation">
                        <div>Phí ship</div>
                        <div>30.000đ</div>
                    </div>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>Tổng thanh toán</div>
                        <div>400.000</div>
                    </div>
                    <a-button type="primary" :block="true">Đặt hàng</a-button>
                </a-form-item>
            </a-form>
        </div>
        <a-modal 
            v-model:open="openModalChangeAddress" 
            title="Danh sách địa chỉ" 
            @ok="handleChangeAddress"
            @cancel="handleCancelChangeAddress"
            okText="Thay đổi"
            cancelText="Hủy"
        >
            <a-list item-layout="horizontal" :data-source="listAddress">
                <template #renderItem="{ item }">
                    <a-radio-group v-model:value="radioSelected" style="width: 100%;">
                        <a-radio :value="convertToJSON(item)">
                            <a-list-item>
                                <a-list-item-meta
                                :description="item.address"
                                >
                                <template #title>
                                    {{ item.name }} | {{ item.phone }}
                                </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-radio>
                    </a-radio-group>
                </template>
            </a-list>
            <a-button :block="true" @click="visibleModalAddAddress" style="margin: 10px, 0px, 10px, 0px" type="dashed">Thêm mới địa chỉ</a-button>
        </a-modal>
        <a-modal 
            v-model:open="openModalAddAddress" 
            title="Thêm địa chỉ mới" 
            @ok="handleAddAddress"
            @cancel="handleCancelAddAddress"
            okText="Thêm mới"
            cancelText="Hủy"
            :centered="true"
            :footer="null"
        >
            <a-form
                ref="formRef"
                :model="shippingInfomation"
                v-bind="layout"
                name="nest-messages"
                :validate-messages="validateMessages"
                @finish="onFinish"
                class="shipping-infomation"
            >
                <a-form-item name="name" label="Nguời nhận" :rules="[{ required: true }]">
                    <a-input v-model:value="shippingInfomation.name" />
                </a-form-item>
                <a-form-item
                    name="phone"
                    label="Số điện thoại"
                    :rules="[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        { pattern: /^0[0-9]{9}$/, message: 'Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 0)' }
                    ]"
                    >
                    <a-input v-model:value="shippingInfomation.phone" />
                </a-form-item>
                <a-form-item :name="address" label="Địa chỉ" :rules="[{ required: true }]">
                    <a-textarea v-model:value="shippingInfomation.address" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 15 }" style="margin-top: 10px;">
                    <a-button style="margin-right: 15px;" @click="handleCancelAddAddress">Hủy</a-button>
                    <a-button type="primary" html-type="submit">Thêm mới</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';

const openModalChangeAddress = ref(false);
const openModalAddAddress = ref(false);
const addressSelected = ref();
const radioSelected = ref();
const deliveryType = ref(1);
const payment = ref(1);
const formRef = ref(null); // Reference đến form để reset sau khi đóng modal
const columns = ref([
    {
        title: 'STT',
        dataIndex: 'stt',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
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
const listProduct = ref([
//   {
//     product: 'John Brown',
//     quantity: 1,
//     price: 10000,
//   },
//   {
//     product: 'Jim Green',
//     quantity: 2,
//     price: 20000,
//   },
//   {
//     product: 'Joe Black',
//     quantity: 1,
//     price: 500000,
//   },
]);
const listAddress = [
    {
        name: 'Nguyễn Hoàng Long',
        phone: '0123456789',
        address: 'thôn 2, xóm 3, xã thư phú, huyện thường tín, thành phố Hà nội',
    },
    {
        name: 'MC Wayne',
        phone: '0123456789',
        address: 'thôn 2, xóm 3, xã thư phú, huyện thường tín, thành phố Hà nội',
    },
    {
        name: 'John Brown',
        phone: '0876946987',
        address: 'thôn 2, xóm 3, xã thư phú, huyện thường tín, thành phố Hà nội',
    },
    {
        name: 'John Green',
        phone: '0876946456',
        address: 'thôn 2, xóm 3, xã thư phú, huyện thường tín, thành phố Hà nội',
    },
];
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 24,
    },
};
const validateMessages = ref({
    required: '${label} không được để trống!',
});
const shippingInfomation = ref({
    name: '',
    phone: '',
    address: '',
});
const onFinish = values => {
  console.log('Success:', values);
};

const convertToJSON = (object) => {
    return JSON.stringify(object);
}
const visibleModalAddAddress = () => {
    handleCancelChangeAddress();
    openModalAddAddress.value = true;
}

// Xử lý modal change và add thông tin nhận hàng
const handleChangeAddress = () => {
    addressSelected.value = JSON.parse(radioSelected.value);
    openModalChangeAddress.value = false;
}
const handleAddAddress = () => {
    // addressSelected.value = JSON.parse(radioSelected.value);
    openModalAddAddress.value = false;
}
const handleCancelChangeAddress = () => {
    radioSelected.value = JSON.stringify(addressSelected.value);
    openModalChangeAddress.value = false;
}
const handleCancelAddAddress = () => {
    // Đóng modal
    openModalAddAddress.value = false;
    
    // Reset form
    formRef.value?.resetFields(); // Reset các field trong form
    
    // Reset giá trị của shippingInfomation
    shippingInfomation.value = {
        name: '',
        phone: '',
        address: '',
    };
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
            width: 50%;
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
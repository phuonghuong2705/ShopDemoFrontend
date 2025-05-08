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
                <template #title><span class="title-form">Giỏ hàng</span></template>
                <template #bodyCell="{ column, text, index, record }">
                    <template v-if="column.dataIndex === 'stt'">
                        {{ index + 1 }}
                    </template>
                    <template v-if="column.dataIndex === 'product'">
                        <a>{{ text }}</a>
                    </template>
                    <template v-if="column.dataIndex === 'price'">
                        {{ record.price }}đ
                    </template>
                    <template v-if="column.dataIndex === 'total'">
                        {{ record.quantity * record.price }}đ
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
                    {{ addressSelected?.recipient_name }}
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
                        <a-radio value="cash">
                            Thanh toán khi nhận hàng (COD)
                        </a-radio>
                        <a-radio value="bank_transfer">
                            Thanh toán qua ngân hàng
                        </a-radio>
                        <a-radio value="credit_card">
                            Thanh toán qua thẻ tín dụng
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item class="gap-block">
                    <span style="font-weight: 600;">Hình thức vận chuyển</span>
                    <a-radio-group @change="calculateTotal()" v-model:value="deliveryType">
                        <a-radio :value="1">
                            <img src="/src/assets/delivery-shipping.svg" alt="">
                            Giao hàng tiêu chuẩn(5-7 ngày)
                        </a-radio>
                        <a-radio :value="2">
                            <img src="/src/assets/delivery-shipping-sp.svg" alt="">
                            Giao hàng hỏa tốc(3-5 ngày)
                        </a-radio>
                        <a-radio :value="3">
                            <img src="/src/assets/delivery-shipping-sp.svg" alt="">
                            Giao hàng nội thành(Trong ngày)
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item>
                    <div class="order-infomation">
                        <div>Tạm tính ({{ listProduct.length }} sản phẩm)</div>
                        <div>{{ itemsTotal }}</div>
                    </div>
                    <div class="order-infomation">
                        <div>Phí ship</div>
                        <div>{{ customFee }}</div>
                    </div>
                </a-form-item>
                <a-divider style="margin: 0 0 10px 0;"></a-divider>
                <a-form-item>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>Tổng thanh toán</div>
                        <div>{{ total }}</div>
                    </div>
                    <a-button type="primary" :block="true" @click="createOrder">Đặt hàng</a-button>
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
            <a-list item-layout="horizontal" style="height: 300px; overflow-x: hidden; overflow-y: auto;" :data-source="listAddress">
                <template #renderItem="{ item }">
                    <a-radio-group v-model:value="radioSelected" style="width: 100%;">
                        <a-radio :value="convertToJSON(item)">
                            <a-list-item>
                                <a-list-item-meta
                                :description="item.address"
                                >
                                <template #title>
                                    <a-flex align="center" justify="space-between" style="width: 100%;">
                                        <div>{{ item.recipient_name }} | {{ item.phone }}</div>
                                        <div>
                                            <a-button type="link" @click="handleDeleteAddress(item.id)">Xóa</a-button>
                                        </div>
                                    </a-flex>
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
                @finish="createAddress"
                class="shipping-infomation"
            >
                <a-form-item name="recipient_name" label="Nguời nhận" :rules="[{ required: true }]">
                    <a-input v-model:value="shippingInfomation.recipient_name" />
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
                <a-form-item name="address" label="Địa chỉ" :rules="[{ required: true }]">
                    <a-textarea v-model:value="shippingInfomation.address" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 14 }" style="margin-top: 10px;">
                    <a-button style="margin-right: 15px;" @click="handleCancelAddAddress">Hủy</a-button>
                    <a-button type="primary" html-type="submit" :loading="loadingAddress">Thêm mới</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useShippingAddressStore } from '@/stores/shippingAddress';
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/order';

const shippingAddressStore = useShippingAddressStore(); // Sử dụng store địa chỉ giao hàng
const orderStore = useOrderStore(); // Sử dụng store đơn hàng
const cartStore = useCartStore(); // Sử dụng store giỏ hàng

const openModalChangeAddress = ref(false);
const openModalAddAddress = ref(false);
const addressSelected = ref();
const radioSelected = ref();
const deliveryType = ref(1);
const payment = ref(1);
const loadingAddress = ref(false); // Biến để kiểm tra trạng thái loading khi thêm địa chỉ
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
const listProduct = ref([]);
const listAddress = ref([]);
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
    recipient_name: '',
    phone: '',
    address: '',
});

const customFee = ref(0); // Biến để lưu phí ship
const itemsTotal = ref(0); // Biến để lưu tổng tiền của giỏ hàng
const total = ref(0); // Biến để lưu tổng tiền của đơn hàng

//loading
const loading = ref(false);
const loadingTable = ref(false); // Biến để kiểm tra trạng thái loading khi thêm sản phẩm vào giỏ hàng

onMounted( async () => {
    // Gọi API để lấy danh sách địa chỉ
    await getListAddress();
    // Gọi API để lấy danh sách sản phẩm trong giỏ hàng
    await getListItemInCart();
    // Gọi API để tính tổng tiền
    await calculateTotal();
});

const getListAddress = async () => {
    try {
        const res = await shippingAddressStore.getListAddress();
        listAddress.value = res;
        
        //Nếu có địa chỉ thì lấy địa chỉ đầu tiên làm địa chỉ mặc định
        if (res.length > 0 && !addressSelected.value) {
            addressSelected.value = res[0];
            radioSelected.value = JSON.stringify(res[0]);
        } else {
            radioSelected.value = JSON.stringify(addressSelected.value);
        }
    } catch (error) {
        console.log(error);
    }
};

const getListItemInCart = async () => {
    loadingTable.value = true; // Bắt đầu loading
    try {
        const res = await cartStore.getListItem().then(res => {
            console.log(res.cart.items);
            listProduct.value = res.cart.items.map((item, index) => ({
                ...item,
                product: item.book_variant.book.title,
                quantity: item.quantity,
                price: item.book_variant.price,
            }));
            // listProduct.value = res;
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
    loadingTable.value = false; // Kết thúc loading
};

const createAddress = async (address) => {
    loadingAddress.value = true; // Bắt đầu loading
    let params = {
        recipient_name: shippingInfomation.value.recipient_name,
        phone: shippingInfomation.value.phone,
        address: shippingInfomation.value.address,
    };
    try {
        await shippingAddressStore.createAddress(params).then(res => {
            message.destroy();
            message.success('Thêm địa chỉ thành công!');
            addressSelected.value = res;
            radioSelected.value = JSON.stringify(addressSelected.value);
            getListAddress(); // Gọi lại API để lấy danh sách địa chỉ mới
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
    loadingAddress.value = false; // Kết thúc loading
    // Đóng modal sau khi thêm địa chỉ thành công
    openModalAddAddress.value = false;
};

const updateAddress = async (address) => {
    let params = {
        name: address.recipient_name,
        phone: address.phone,
        address: address.address,
    };
    try {
        const res = await shippingAddressStore.updateAddress(address).then(res => {
            message.destroy();
            message.success('Cập nhật địa chỉ thành công!');
            addressSelected.value = res;
            radioSelected.value = JSON.stringify(res);
            getListAddress(); // Gọi lại API để lấy danh sách địa chỉ mới
        }).catch(error => {
            console.log(error);
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

const deleteAddress = async (addressId) => {
    try {
        await shippingAddressStore.deleteAddress(addressId).then(res => {
            message.destroy();
            message.success('Xóa địa chỉ thành công!');
            addressSelected.value = null;
            radioSelected.value = null;
            getListAddress(); // Gọi lại API để lấy danh sách địa chỉ mới
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
};

const calculateTotal = async () => {
    let params = {
        custom_fee_id: deliveryType.value,
        edition: listProduct.value.map(item => ({
            book_variant_id: item.book_variant.id,
            quantity: item.quantity,
        })),
    };
    try {
        await cartStore.calculateTotal(params).then(res => {
            customFee.value = res.custom_fee;
            itemsTotal.value = res.items_total;
            total.value = res.total;
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
};

const handleDeleteAddress = (addressId) => {
    Modal.confirm({
        title: 'Xóa địa chỉ',
        content: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        onOk() {
            deleteAddress(addressId);
        },
    });
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

const createOrder = async () => {
    let params = {
        recipient_name: addressSelected.value.recipient_name,
        address: addressSelected.value.address,
        phone: addressSelected.value.phone,
        custom_fee_id: deliveryType.value,
        payment_type: payment.value,
        items: listProduct.value.map(item => ({
            book_variant_id: item.book_variant.id,
            quantity: item.quantity,
        })),
    };
    try {
        await orderStore.createOrder(params).then(res => {
            message.destroy();
            message.success('Đặt hàng thành công!');
            // Chuyển hướng đến trang chi tiết đơn hàng
            // router.push(`/order/${res.id}`);
            getListItemInCart();
            console.log(res);
            
        }).catch(error => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
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
<template>
    <div class="content">
        <a-spin :spinning="loading" size="large" style="margin-top: 20px;">
            <a-card class="product-detail" >
                <template #title><span style="font-weight: 600; font-size: 25px;">Thông tin sản phẩm</span></template>
                <a-flex style="width: 100%;" horizontal :gap="20">
                    <a-flex style="width: 38%;" class="image-detail"  vertical>
                        <a-image
                            :width="300" :height="320" 
                            class="image-view"
                            :preview=true
                            :src="imgView"
                            fallback="data:image/png;base64,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"
                        />
                        <a-flex>
                            <div v-for="(item, index) in listImg" :key="index">
                                <div class="image-slot" @click="setMainImg(item)">
                                    <a-image 
                                        :width="50" :height="50" :preview=false
                                        style="border-radius: 6px;"
                                        :src="item.url"
                                        fallback="data:image/png;base64,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"
                                    />
                                </div>
                            </div>
                        </a-flex>
                    </a-flex>
                    <a-flex style="width: 62%;" class="product-info" vertical>
                        <div class="product-name">{{ title }}</div>
                        <div class="author">Tác giả: {{ author }}</div>
                        <div class="rating">
                            <div>{{ averageRating }}</div>
                            <a-rate :disabled="true" style="font-size: 14px; line-height: 1;" :value="averageRating" allow-half />
                            <div>Đã bán: {{ totalSold }}</div>
                        </div>
                        <div class="price">
                            {{ filters.normalizeNumber(price) }}<sup>đ</sup>
                        </div>
                        <div class="type">
                            Phiên bản
                            <a-radio-group v-model:value="selectedEditionId"
                                option-type="button"
                                @change="handleChangeEdition()"
                                :options="listEdition" 
                                buttonStyle="solid" 
                                :gap="10"
                                :field-names="{ label: 'edition', value: 'id' }"
                            >
                            </a-radio-group>
                        </div>
                        <div class="quantity">
                            Số lượng
                            <div style="gap: 5px; display: flex; flex-direction: row;">
                                <a-button style="width: 40px;" @click="reduceQuantity"><b>-</b></a-button>
                                <a-input-number id="inputNumber" v-model:value="quantity" :min="1" style="width: 40px;"/>
                                <a-button style="width: 40px;" @click="increaseQuantity"><b>+</b></a-button>
                            </div>
                        </div>
                        <div class="total">
                            Tạm tính
                            <div style="font-size: 24px; font-weight: 600;">
                                {{ filters.normalizeNumber(price * quantity) }}<sup>đ</sup>
                            </div>
                        </div>
                        <a-button class="add-to-cart" :disabled="selectedEdition?.stock == 0" type="primary" size="large" @click="addToCart()">Thêm vào giỏ hàng</a-button>
                    </a-flex>
                </a-flex>
            </a-card>
            <a-card class="description">
                <template #title>Giới thiệu sách</template>
                <div v-if="description" v-html="description"></div>
                <a-empty v-else description="Không có mô tả" />
            </a-card>
        </a-spin>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import filters from '@/utils/filters';
import { message } from 'ant-design-vue';

onMounted(() => {
    detailProduct();
});

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const selectedEdition = ref();
const selectedEditionId = ref();
const quantity = ref(1);
const loading = ref(false);
const listEdition = ref([]);
const listInformationEdition = ref([]);
const author = ref(null);
const description = ref(null);
const title = ref(null);
const price = ref(0);
const totalSold = ref(0);
const averageRating = ref(0);
const descriptionSample = ref(`<ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul> <ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul> <ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul> <ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul> <ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul><ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul> <ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul> <ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul><ul>
    <li><strong>Phần I:</strong> Những mạng lưới của con người</li>
    <li><strong>Phần II:</strong> Mạng lưới vô cơ</li>
    <li><strong>Phần III:</strong> Nền chính trị máy tính</li>
</ul>`);
const imgView = ref(null);
const listImg = ref([]);
const setMainImg = (item) => {
    imgView.value = item.url;
}

const detailProduct = async () => {
    loading.value = true;
    let params = {
        id: route.params.id,
    };
    try {
        await productStore.getDetailBook(params).then((res) => {
            if (res) {
                averageRating.value = res.average_rating;
                totalSold.value = res.total_sold;
                description.value = res.description;
                author.value = res.author;
                title.value = res.title;
                listInformationEdition.value = res.book_variants;
                listEdition.value = res.book_variants.map(edition => ({
                    label: edition.edition,
                    value: edition.id,
                }));
                selectedEditionId.value = res.book_variants[0].id;
                handleChangeEdition();
            } else {
                console.log("Không có sản phẩm nào");
            }
        }).catch((error) => {
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
    loading.value = false;
};

const handleChangeEdition = (value) => {
    if(selectedEditionId.value) {
        selectedEdition.value = listInformationEdition.value.find(item => item.id === selectedEditionId.value);
        if (selectedEdition.value) {
            imgView.value = selectedEdition.value.book_variant_images[0].image_url;
            price.value = selectedEdition.value.price;
            listImg.value = selectedEdition.value.book_variant_images.map(item => ({
                url: item.image_url,
            }));
        }
    }
}

const reduceQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
}
const increaseQuantity = () => {
    quantity.value++;
}

const addToCart = () => {
    let params = {
        book_variant_id: selectedEditionId.value,
        quantity: quantity.value,
    };
    cartStore.addItemToCart(params).then((res) => {
        message.destroy();
        message.success("Thêm vào giỏ hàng thành công");
    }).catch((error) => {
        console.log(error);
    });
}
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
    flex-direction: column;
    .product-detail{
        margin-bottom: 20px;
        width: 900px;
        .image-detail{
            padding: 10px;
            border: 1px solid gainsboro;
            border-radius: 8px;
            :deep(.ant-image){
                .image-view{
                    border-radius: 8px;
                }
            }
            .image-slot{
                border: 1px solid rgb(219, 219, 219);
                border-radius: 8px;
                padding: 3px;
                margin-top: 12px;
                margin-right: 3px;
            }
            .image-slot:hover{
                cursor: pointer;
            }
        }
        .product-info{
            gap: 10px;
            font-family: Arial, Helvetica, sans-serif;
            .product-name{
                font-size: 20px;
            }
            .rating{
                display: flex;
                height: 15px;
                flex-direction: row;
                align-items: flex-start;
                gap: 10px;
            }
            .price{
                font-size: 24px;
                color: red;
                font-weight: 600;
            }
            .type{
                font-weight: 600;
            }
            .quantity{
                font-weight: 600;
                display: flex;
                flex-direction: column;
            }
            .total{
                font-weight: 600;
            }
        }
    }
    .description{
        width: 900px;
        font-weight: 600;
    }
}
:deep(.ant-card-head){
    border: none;
}
:deep(.ant-card-body){
    padding-top: 10px;
}
:deep(.ant-image-mask){
    border-radius: 8px;
}
:deep(.ant-image-mask):hover{
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
:deep(.ant-radio-group){
    display: flex;
    gap: 10px;
}
:deep(.ant-radio-button-wrapper){
    border-radius: 8px;
}
:deep(.ant-radio-button-wrapper:not(:first-child)::before){
    display: none !important; /* Ẩn viền mặc định */
}
:deep(.ant-radio-button-wrapper:not(:first-child)){
    border-left: 1px solid #d9d9d9 !important; /* Tạo viền thủ công */
    border-top-left-radius: 8px !important; /* Bo tròn góc trên */
    border-bottom-left-radius: 8px !important; /* Bo tròn góc dưới */
}
:deep(.ant-input-number-handler-wrap){
    display: none;
}
:deep(.ant-input-number-input){
    text-align: center;
}
</style>
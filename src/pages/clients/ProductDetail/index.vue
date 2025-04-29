<template>
    <div class="content">
        <a-card class="product-detail" >
            <template #title><span style="font-weight: 600; font-size: 25px;">Thông tin sản phẩm</span></template>
            <a-flex horizontal :gap="20">
                <a-flex class="image-detail"  vertical>
                    <a-image
                        :width="300" :height="320" 
                        class="image-view" 
                        :preview=true
                        :src="imgView"
                    />
                    <a-flex>
                        <div v-for="(item, index) in listImg" :key="index">
                            <div class="image-slot" @click="setMainImg(item)">
                                <a-image 
                                    :width="50" :preview=false
                                    style="border-radius: 6px;"
                                    :src="item.url"
                                    fallback="data:image/png;base64,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"
                                />
                            </div>
                        </div>
                    </a-flex>
                </a-flex>
                <a-flex class="product-info" vertical>
                    <div class="product-name">NEXUS - Lược Sử Của Những Mạng Lưới Thông Tin Từ Thời Đại Đồ Đá Đến Trí Tuệ Nhân Tạo</div>
                    <div class="author">Tác giả: Yuval Noah Harari</div>
                    <div class="rating">
                        <div>2.5</div>
                        <a-rate style="font-size: 14px; line-height: 1;" :value="2.5" allow-half />
                        <div>Đã bán: 1000</div>
                    </div>
                    <div class="price">
                        120.000<sup>đ</sup>
                    </div>
                    <div class="type">
                        Phiên bản
                        <a-radio-group v-model:value="value1" buttonStyle="solid" :gap="10">
                            <a-radio-button value="a">Hangzhou</a-radio-button>
                            <a-radio-button value="b">Shanghai</a-radio-button>
                            <a-radio-button value="c">Beijing</a-radio-button>
                            <a-radio-button value="d">Chengdu</a-radio-button>
                        </a-radio-group>
                    </div>
                    <div class="quantity">
                        Số lượng
                        <div style="gap: 5px; display: flex; flex-direction: row;">
                            <a-button style="width: 40px;"><b>-</b></a-button>
                            <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" style="width: 40px;"/>
                            <a-button style="width: 40px;"><b>+</b></a-button>
                        </div>
                    </div>
                    <div class="total">
                        Tạm tính
                        <div style="font-size: 24px; font-weight: 600;">
                            120.000<sup>đ</sup>
                        </div>
                    </div>
                    <a-button class="add-to-cart" type="primary" size="large">Thêm vào giỏ hàng</a-button>
                </a-flex>
            </a-flex>
        </a-card>
        <a-card class="description">
            <template #title>Giới thiệu sách</template>
            <!-- <div v-html="para"></div> -->
                <a-empty description="Không có mô tả" />
        </a-card>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

const value1 = ref();
const value = ref(1);
const para = ref(`<ul>
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
const imgView = ref("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png");
const listImg = ref([
    {
        url: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/307758117/original/c298473760d5ac65d8d78fa1d74ef32763ea36ac/create-custom-images-that-are-both-stunning-and-unique.png"
    },
    {
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuu.png"
    },
    {
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
]);
const setMainImg = (item) => {
    console.log(item);
    imgView.value = item.url;
}
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
    gap: 20px;
    flex-direction: column;
    .product-detail{
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
<template>
    <div class="content">
        <a-card class="product-detail" >
            <template #title><span style="font-weight: 600; font-size: 25px;">Thông tin sản phẩm</span></template>
            <a-flex horizontal :gap="20">
                <a-flex class="image-detail"  vertical>
                    <a-image
                        :width="300" :height="320" class="image-view" preview=false
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <a-flex>
                        <div class="image-slot">
                            <a-image 
                                :width="50" :preview=false
                                style="border-radius: 6px;"
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>
                        <div class="image-slot">
                            <a-image 
                                :width="50" :preview=false
                                style="border-radius: 6px;"
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>
                        <div class="image-slot">
                            <a-image 
                                :width="50" :preview=false
                                style="border-radius: 6px;"
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>
                        <div class="image-slot">
                            <a-image 
                                :width="50" :preview=false
                                style="border-radius: 6px;"
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>
                        <div class="image-slot" style="margin-right: 0px;">
                            <a-image 
                                :width="50" :preview=false
                                style="border-radius: 6px;"
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
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
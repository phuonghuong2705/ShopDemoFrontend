<template>
    <div class="content">
        <a-flex :gap="12" vertical justify="center" align="center">
            <a-flex :gap="15">
                <Slider />
                <a-flex vertical :gap="15">
                    <HomeBanner />
                    <VideoBanner v-model:videoId="videoId" />
                </a-flex>
            </a-flex>
            <img style="width: 79vw; height: 200px; border-radius: 8px;" src="/public/img/32223_SkinnyHero_MyFriendsFrederickBackman_05_06_25.jpg" alt="">
        </a-flex>
        <div class="product-best-seller">
            <div class="title">Sách nổi bật</div>
            <div class="best-seller">
                <div class="list-product">
                    <ProductItem
                        v-for="prod in listProduct"
                        :product="prod"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Slider from './Slider.vue';
import VideoBanner from './VideoBanner.vue';
import HomeBanner from './HomeBanner.vue';
import ProductItem from '@/components/clients/ListProduct/ProductItem.vue';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();
const width = ref();
const height = ref();
const listProduct = ref([]);
const videoId = ref('yZrvuX2rrNk');

const updateWidth = () => {
    width.value = window.innerWidth;
    return width.value;
};
const updateHeight = () => {
    height.value = window.innerHeight;
    return height.value;
};

onMounted(() => {
    getListProduct();
    window.addEventListener("resize", () => {
        updateWidth();
        updateHeight();
    })
});

const getListProduct = async () => {
        const res = await productStore.getListBook().then((res) => {
            listProduct.value = res.slice(0, 18);
            console.log(res);
            
        }).catch((error) => {
            console.log(error);
        });
};
</script>

<style scoped lang="scss">
    .content {
        margin-top: 20px;
        align-items: center;
        color: black;
        display: flex;
        flex-direction: column;
        .product-best-seller{
            background-color: f0eded;
            border-radius: 8px;
            .title{
                display: flex;
                justify-content: center;
                font-size: 2.155rem;
                font-weight: 700;
                font-family: italic;
                margin-top: 25px;
                margin-bottom: 5px;
            }
            .best-seller{
                justify-content: center;
                display: flex;
                .list-product{
                    margin-top: 10px;
                    width: 90%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
            }
        }
    }
</style>
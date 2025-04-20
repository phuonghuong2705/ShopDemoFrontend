<template>
    <div class="content">
        <Slider />
        <div class="product-best-seller">
            <div class="title">Sách nổi bật</div>
            <div class="best-seller">
                <ListProduct />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Slider from './Slider.vue';
import VideoBanner from './VideoBanner.vue';
import HomeBanner from './HomeBanner.vue';
import ListProduct from '@/pages/clients/ListProduct/ListProductHome.vue';
import FilterBox from '@/components/common/FilterBox.vue';

const width = ref();
const height = ref();

const updateWidth = () => {
    width.value = window.innerWidth;
    return width.value;
};
const updateHeight = () => {
    height.value = window.innerHeight;
    return height.value;
};

onMounted(() => {
    window.addEventListener("resize", () => {
        updateWidth();
        updateHeight();
    })
});
</script>

<style scoped lang="scss">
    .content {
        align-items: center;
        color: black;
        display: flex;
        flex-direction: column;
        .product-best-seller{
            background-color: white;
            margin-top: 15px;
            border-radius: 8px;
            .title{
                display: flex;
                justify-content: center;
                font-size: 32px;
                font-weight: 700;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin-top: 25px;
                margin-bottom: 5px;
            }
            .best-seller{
                justify-content: center;
            }
        }
    }
</style>
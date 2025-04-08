<template>
    <div class="content">
        <div class="banner-home">
            <a-row :gutter="[16,16]">
                <a-col style="width: 68%;"><Slider /></a-col>
                <a-col style="width: 32%; max-height: 400px;">
                    <a-row>
                        <div style="width: 100%; margin-bottom: 10.5px;">
                            <VideoBanner videoId="kFZo7yJ2ONg" />
                        </div>
                    </a-row>
                    <a-row>
                        <div>
                            <HomeBanner />
                        </div>
                    </a-row>
                </a-col>
            </a-row>
        </div>
        <FilterBox />
        <div class="product-best-seller">
            <div class="title">Sản phẩm bán chạy</div>
            <div class="best-seller">
                <ListProduct />
            </div>
        </div>
        <div class="product-best-seller">
            <div class="title">Bộ sưu tập</div>
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
        margin: 1em;
        color: black;
        display: flex;
        flex-direction: column;
        .banner-home{
            max-width: 1100px;
            max-height: 400px;
        }
        .product-best-seller{
            background-color: white;
            margin-top: 25px;
            border-radius: 8px;
            .title{
                display: flex;
                justify-content: center;
                font-size: 20px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin-top: 25px;
                margin-bottom: 5px;
            }
            .best-seller{
                justify-content: center;
                max-width: 1100px;
            }
        }
    }
</style>
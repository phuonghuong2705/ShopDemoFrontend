<template>
    <div class="content">
        <div class="filter">
            <FilterBox />
        </div>
        <a-spin :spinning="loading">
            <div class="list-product">
                <ProductItem
                    v-for="prod in listProduct"
                />
            </div>
        </a-spin>
    </div>
</template>
<script setup>
import FilterBox from '@/components/common/FilterBox.vue';
import ProductItem from '@/components/clients/ListProduct/ProductItem.vue';
import { ref } from 'vue';

const loading = ref(false);
const listProduct = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
</script>
<style lang="scss" scoped>
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black;
        position: relative;
        // .filter{
        //     position: sticky;
        //     top: 0;
        //     z-index: 1;
        // }
        .list-product{
            margin-top: 10px;
            justify-content: center;
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>
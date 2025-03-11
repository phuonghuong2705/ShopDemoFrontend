<template>
    <div>
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
import ProductItem from '@/components/clients/ListProduct/ProductItem.vue';
import { ref } from 'vue';

const loading = ref(false);
const listProduct = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
</script>
<style lang="scss" scoped>
    .list-product{
        margin-top: 20px;
        display: flex;
        gap: 20px;
        max-width: 1100px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>
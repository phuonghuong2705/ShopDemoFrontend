<template>
    <div class="content">
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
const listProduct = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
</script>
<style lang="scss" scoped>
.content{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px !important;
    .list-product{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
}
</style>
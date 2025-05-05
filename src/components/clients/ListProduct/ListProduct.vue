<template>
    <div class="content">
        <div class="filter">
            <FilterBox />
        </div>
        <a-spin :spinning="loading">
            <div class="list-product">
                <ProductItem
                    v-for="prod in listProduct"
                    :product="prod"
                />
            </div>
        </a-spin>
    </div>
</template>
<script setup>
import FilterBox from '@/components/common/FilterBox.vue';
import ProductItem from '@/components/clients/ListProduct/ProductItem.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

onMounted(() => {
    getListBookByCategory();
});

const loading = ref(false);
const listProduct = ref([]);

const getListBookByCategory = async () => {
    if (router.currentRoute.value.name == 'Education') {
        getListProduct(1);
    } else if (router.currentRoute.value.name == 'LifeSkills') {
        getListProduct(2);
    } else if (router.currentRoute.value.name == 'Business') {
        getListProduct(3);
    } else if (router.currentRoute.value.name == 'Entertainment') {
        getListProduct(4);
    } else if (router.currentRoute.value.name == 'Academic') {
        getListProduct(5);
    } else if (router.currentRoute.value.name == 'Lifestyle') {
        getListProduct(6);
    } else {
        getListProduct();
    }
    console.log(router.currentRoute.value.name);
};
    
const getListProduct = async (categoryId) => {
    loading.value = true;
    let params = {
        category_id: categoryId,
    };
    try {
        const res = await productStore.getListBook(params);
        listProduct.value = res;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

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
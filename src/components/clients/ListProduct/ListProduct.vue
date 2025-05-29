<template>
    <div class="content">
        <div class="filter">
            <FilterBox
                v-model:subGender="subGender"
                v-model:subGenderSelect="subGenderSelect"
                v-model:searchName="searchName"
                v-model:softBy="softBy"
                v-model="rangePrice"
                @update:rangePrice="handleChangeRangePrice"
                @update:subGenderSelect="handleChangeSubGender"
                @update:searchName="handleChangeSearchName"
                @update:softBy="handleChangeSoftBy"
            />
        </div>
        <a-spin :spinning="loading">
            <div class="list-product" v-if="listProduct.length > 0 && !loading">
                <ProductItem
                    v-for="prod in listProduct"
                    :product="prod"
                />
            </div>
            <div v-else-if="listProduct.length == 0 && !loading" class="no-product">
                <h3>Không có sản phẩm nào</h3>
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
import { max } from 'lodash';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const categoryId = ref(null);

onMounted(() => {
    getListBookByCategory();
});

const loading = ref(false);
const listProduct = ref([]);
const subGender = ref([]);
const subGenderSelect = ref(null);
const searchName = ref(null);
const softBy = ref('default');
const rangePrice = ref({
    min: null,
    max: null,
});

const getListBookByCategory = async () => {
    if (router.currentRoute.value.name == 'Education') {
        categoryId.value = 1;
    } else if (router.currentRoute.value.name == 'LifeSkills') {
        categoryId.value = 2;
    } else if (router.currentRoute.value.name == 'Business') {
        categoryId.value = 3;
    } else if (router.currentRoute.value.name == 'Entertainment') {
        categoryId.value = 4;
    } else if (router.currentRoute.value.name == 'Academic') {
        categoryId.value = 5;
    } else if (router.currentRoute.value.name == 'Lifestyle') {
        categoryId.value = 6;
    }
    getListProduct();
    getListSubCategory();
};

const getListSubCategory = async () => {
    let params = {
        category_id: categoryId.value || null,
    };
    await productStore.getListSubCategory(params).then((res) => {
        subGender.value = res || [];
    }).catch((error) => {
        console.log(error);
    })
};
    
const getListProduct = async () => {
    loading.value = true;
    let params = {
        category_id: categoryId.value || null,
        subgenre_id: subGenderSelect.value || null,
        book_name: searchName.value || null,
        soft_by: softBy.value || 'default',
        max_price: rangePrice.value.max || null,
        min_price: rangePrice.value.min || null,
    };
    try {
        const res = await productStore.getListBook(params);
        listProduct.value = res || [];
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const handleChangeSubGender = (value) => {
    subGenderSelect.value = value;
    getListProduct();
};

const handleChangeSearchName = (value) => {
    searchName.value = value;
    getListProduct();
};

const handleChangeSoftBy = (value) => {
    softBy.value = value;
    getListProduct();
};

const handleChangeRangePrice = (value) => {
    rangePrice.value = value;
    getListProduct();
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
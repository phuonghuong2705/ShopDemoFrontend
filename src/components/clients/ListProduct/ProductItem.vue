<template>
    <div class="product-item" @click="routeLinkToProductDetail(props.product?.id)">
        <a-card hoverable style="padding: 10px; border: 1px solid gainsboro;">
            <template #cover>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta :title="props.product?.title">
                <template #description>
                    <div>{{ props.product?.author }}</div>
                    <a-flex align="center" justify="space-between">
                        <a-rate style="font-size:10px" :value="props.product?.average_rating" allow-half disabled />
                        <div>Đã bán: {{ props.product?.total_sold }}</div>
                    </a-flex>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

onMounted(() => {
});

const routeLinkToProductDetail = (productID) => {
    router.push({
        name: 'ProductDetail',
        query: {
            ...route.query
        },
        params: {
            id: productID,
        }
    })
}
</script>
<style lang="scss" scoped>
.product-item{
    width: 250px;
    padding: 10px 0 10px 20px;
}
:deep(.ant-rate-star:not(:last-child)){
    margin-inline-end: 2px;
}
</style>
<template>
    <div class="product-item" @click="routeLinkToProductDetail()">
        <a-card hoverable>
            <template #cover>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            Hoa phuowjng ddor
            <a-card-meta title="Europe Street beat">
                <template #description>
                    <a-flex align="center" justify="space-between">
                        <a-rate style="font-size:10px" :value="2.5" allow-half disabled />
                        Đã bán: 1000
                    </a-flex>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


const routeLinkToProductDetail = () => {
    router.push({
        name: 'ProductDetail',
    })
}
</script>
<style lang="scss" scoped>
.product-item{
    width: 215px;
    padding: 10px 0 10px 20px;
}
:deep(.ant-rate-star:not(:last-child)){
    margin-inline-end: 2px;
}
</style>
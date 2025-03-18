<template>
    <div class="content">
        <a-card style="width: 1000px">
            <template #title>Thông tin sản phẩm</template>
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
        </a-card>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
</style>
<template>
    <div class="banner">
        <img src="/public/img/homeBanner.jpg" style="object-fit: cover;"/>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.banner {
    max-width: 341px; /* Ví dụ: Giới hạn chiều rộng */
    aspect-ratio: 16 / 9; /* Đặt tỷ lệ 9:16 */
    height: 187.6px; /* Hoặc chiều cao tùy ý */

}

.banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
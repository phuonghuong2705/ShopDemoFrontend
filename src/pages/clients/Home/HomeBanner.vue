<template>
    <div class="banner">
        <img src="https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp" />
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.banner {
    width: 100%; /* Hoặc đặt max-width tùy nhu cầu */
    max-width: 341px; /* Ví dụ: Giới hạn chiều rộng */
    aspect-ratio: 16 / 9; /* Đặt tỷ lệ 9:16 */
    overflow: hidden;
}

.banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
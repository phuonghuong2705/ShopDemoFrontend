<!-- <template>
    <div class="slider-container">
         <div class="img-background">
            <div class="overlay"></div>
            <a-flex style="position: relative; z-index: 1; color: #FFFFFF; width: 80%; height: 60%; display: flex; align-items: flex-start;" vertical>
                <div style="color: white; font-size: 64px; font-family: Arial, Helvetica, sans-serif; font-weight: 600; width: 70%;">Tìm ra cuốn sách tiếp theo khiến bạn say mê</div>
                <div style="color: white; font-size: 24px; font-family: Arial, Helvetica, sans-serif;">Khám phá hàng triệu đầu sách từ các nhà bán lẻ độc lập trên toàn thế giới.</div>
            </a-flex>
         </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
const currentIndex = ref(0);
const isTransitioning = ref(false);
const slides = ref([
    { image: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp" },
    { image: "https://images4.alphacoders.com/115/thumb-1920-115716.jpg" },
    { image: "https://th.bing.com/th/id/OIP.f4E1BP_gAZSrwOp-yKBNVwHaEo?pid=ImgDet&w=474&h=296&rs=1" },
]);
let interval = null;

// Clone thêm ảnh đầu tiên vào cuối danh sách để tạo hiệu ứng trượt mượt mà
const clonedSlides = computed(() => [...slides.value, slides.value[0]]);

// Kiểm soát hiệu ứng transition
const smoothTransition = computed(() =>
    isTransitioning.value ? "transform 0.5s ease-in-out" : "none"
);

const startAutoSlide = () => {
    interval = setInterval(() => {
        nextSlide();
    }, 5000);
};

const nextSlide = () => {
    if (currentIndex.value < slides.value.length) {
        currentIndex.value++;
        isTransitioning.value = true;
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = slides.value.length;
        isTransitioning.value = false;
        setTimeout(() => {
        currentIndex.value--;
        isTransitioning.value = true;
        }, 50);
    }
};

const handleTransitionEnd = () => {
    if (currentIndex.value === slides.value.length) {
        isTransitioning.value = false;
        currentIndex.value = 0;
    }
};

onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>
  
<style scoped lang="scss">
.slider-container {
    height: 600px;
    width: 100%;
    .img-background{
        height: 600px;
        position: relative;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background-image: url(/public/img/background_home.png);
        .overlay {
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.2); /* Điều chỉnh độ tối ở đây */
            z-index: 1;
        }
    }
    .slider {
        width: 100%;
        height: 100%;
        position: relative;
        .slides {
            display: flex;
            transition: transform 0.5s ease-in-out;
            .slide {
                min-width: 100%;
                img {
                    width: 100%;
                    height: 600px;
                }
            }
        }
    }
}


.prev-theme, .next-theme {
    width: 18.75%;
    height: 100%;
    background-color: black;
    position: absolute;
    opacity: 0;
    top: 0;
}

.prev-theme {
    left: 0;
    
}
.next-theme {
    right: 0;
}

.prev-theme:hover, .next-theme:hover {
    opacity: 0.5;
}


/* Nút chuyển slide */
.prev-button, .next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
}

.prev-button {
    left: 35%;
}

.next-button {
    right: 35%;
}

.prev-button:hover, .next-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}
</style> -->
<template>
    <div class="slider-container">
        <a-carousel arrows>
            <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <left-circle-outlined />
            </div>
            </template>
            <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
                <right-circle-outlined />
            </div>
            </template>
            <img src="https://bizweb.dktcdn.net/100/326/228/themes/683227/assets/slider3-for.png?1744347873648" style="object-fit: contain;" alt="">
            <img src="https://bizweb.dktcdn.net/100/326/228/themes/683227/assets/slider2-for.png?1744347873648" style="object-fit: contain;" alt="">
        </a-carousel>
    </div>
</template>
<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { Carousel } from 'ant-design-vue';
</script>
<style scoped>
.slider-container {
    width: 55vw;
    height: 390px;
}
/* For demo */
:deep(.slick-slide) {
    text-align: center;
    height: 390px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>
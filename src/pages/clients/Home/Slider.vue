<template>
    <div class="slider-container">
        <div class="slider">
            <div
                class="slides"
                :style="{ transform: `translateX(-${currentIndex * 100}%)`, transition: smoothTransition }"
                @transitionend="handleTransitionEnd"
            >
                <div v-for="(slide, index) in clonedSlides" :key="index" class="slide">
                <img style="object-fit: cover;" :src="slide.image" :alt="'Slide ' + (index + 1)" />
                </div>
            </div>
        </div>

        <!-- Nút Previous -->
        <div class="prev-theme">
            <button class="prev-button" @click="prevSlide">❮</button>
        </div>
        <!-- <a-button class="prev-button" @click="prevSlide">❮</a-button> -->
        <!-- Nút Next -->
         <div class="next-theme">
             <button class="next-button" @click="nextSlide">❯</button>
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
    position: relative;
    height: 400px;
    width: 100%;
    overflow: hidden;
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
                    height: auto;
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
</style>

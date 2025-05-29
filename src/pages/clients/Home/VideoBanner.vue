<template>
    <div ref="containerRef" class="video-container">
        <div id="youtube-player"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const props= defineProps({
    videoId: {
    type: String,
    required: true
    }
})
const containerRef = ref(null);
const player = ref(null);

const createPlayer = () => {
    nextTick(() => {
        if (containerRef.value) {
            const width = containerRef.value.clientWidth;
            const height = (width * 9) / 16;

            player.value = new YT.Player("youtube-player", {
                width,
                height,
                videoId: props.videoId,
                playerVars: { autoplay: 0, controls: 1 }
            });
        }
    });
};

onMounted(() => {
    window.addEventListener("resize", updateSize);
    if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
    };

    window.onYouTubeIframeAPIReady = createPlayer;

    if (window.YT && window.YT.Player) {
        createPlayer();
    };
});

onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
});

const updateSize = () => {
    if (player.value && containerRef.value) {
        const width = containerRef.value.clientWidth;
        const height = (width * 9) / 14; // Tỷ lệ 16:9
        player.value.setSize(width, height);
    }};
</script>

<style scoped>
.controls {
    margin-top: 10px;
}
button {
    margin-right: 10px;
    padding: 8px 15px;
    font-size: 16px;
    cursor: pointer;
}
.video-container {
    width: 100%; /* Hoặc một kích thước cụ thể như 80% */
    height: 100%; /* Giới hạn kích thước tối đa */
    margin: auto;   
}
</style>

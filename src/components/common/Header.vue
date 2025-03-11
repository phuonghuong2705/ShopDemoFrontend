<template>
    <div class="header">
        <a-flex  justify="space-around" style="height: 70px;" align="center" horizontal>
            <a-flex gap="20" align="center">
                logo
                <a-input-search
                    placeholder="Tìm kiếm"
                    style="width: 200px"
                />
            </a-flex>
            <a-flex gap="20" align="center">
                <a-button @click="redirectToRegister()">
                    Đăng ký
                </a-button>
                <a-button @click="redirectToLogin()">
                    Đăng nhập
                </a-button>
            </a-flex>
            <!-- <a-flex v-else align="center">
                <a-avatar></a-avatar>
                {{ store.user.name }}
            </a-flex> -->
        </a-flex>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
// import { authStore } from '../store/authStore';

// const store = authStore();

const route = useRoute();
const router = useRouter();

//action
const redirectToLogin = () => {
    router.push({
        name: 'Login',
    });
}

const redirectToRegister = () => {
    router.push({
        name: 'Register',
    });
}
</script>

<style scoped lang="scss">
    .header{
        width: 100vw;
        height: 70px;
        background-image: url(/img/backGround.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>
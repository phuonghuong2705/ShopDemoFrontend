<template>
    <div class="layout">
        <div class="container">
            <Header />
            <div class="content">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="main-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/common/Header.vue';
import Sidebar from '../../components/common/Sidebar.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
// import { authStore } from '../store/authStore';
import api from '../../api/auth';

// const store = authStore();
const route = useRoute();
const router = useRouter();
const listComponent = ref(['dashboard'])
const user = ref();

onMounted(() => {
    // if (listComponent.value.some(keyword => route.path.includes(keyword))) {
    //     getUser();
    // }
    getUser();
});

// const getUser = () => {
//     store.getUser().then(res => {
//         console.log(res, 123);
//     }).catch(err => {
//         console.log(err);
//         redirectToLogin();
//     })
// };
const getUser = async () => {
    try {
        const response = await api.getUser();
        user.value = response.data;

    } catch (error) {
        console.log(error);
        redirectToLogin();
    }
};

const redirectToLogin = () => {
    router.push({
        name: 'Login',
    });
}
</script>

<style scoped lang="scss">
    .layout{
        display: flex;
        height: 100vh;
        .container {
        flex: 1;
        width: calc(100% - 48px);
        height: calc(100% - 70px);
        .content {
            height: 100%;
            display: flex;
            .sidebar{
                display: flex;
                height: 100%;
            }
            .main-content {
                flex: 1;
                background-color: #f0eded;
                overflow: auto;
            }
        }
    }
    }
</style>
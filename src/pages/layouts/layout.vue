<template>
    <div class="layout">
        <div class="container">
            <Header/>
            <div class="content">
                <div class="sidebar" v-if="route.meta.layout == 'admin'">
                    <Sidebar />
                </div>
                <div class="main-content" :style="{backgroundColor: route.meta.layout == 'admin' ? '#f0eded' : 'white'}">
                    <a-config-provider :locale="locale">
                        <router-view />
                    </a-config-provider>
                </div> 
                <!-- <Footer /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import Sidebar from '../../components/common/Sidebar.vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import locale from 'ant-design-vue/es/locale/vi_VN';

// const store = authStore();
const route = useRoute();
const router = useRouter();
const listComponent = ref(['dashboard']);
const authStore = useAuthStore();
const user = ref();

onBeforeMount(() => {
    authStore.getUser();
});

onMounted(() => {
    
});

// const getUser = async () => {
//     try {
//         const response = await api.getUser();
//         user.value = response.data;

//     } catch (error) {
//         console.log(error);
//         redirectToLogin();
//     }
// };

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
        width: 100vw;
        .container {
            // flex: 1;
            // width: calc(100% - 48px);
            width: 100%;
            .content {
                height: calc(100% - 60px);
                display: flex;
                .sidebar{
                    display: flex;
                    height: 100%;
                    // overflow-y: auto;
                    // overflow-x: hidden;
                }
                .main-content {
                    flex: 1;
                    // background-color: #f0eded;
                    // background-color: white;
                    overflow: auto;
                }
            }
        }
    }
</style>
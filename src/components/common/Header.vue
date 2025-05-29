<template>
    <div class="header">
        <a-flex  justify="space-evenly" style="height: 60px;" align="center" horizontal>
            <a-flex gap="20" align="center">
                <a-typography-title :level="2" style="margin-bottom: 0;">BookStore</a-typography-title>
                <a-menu v-if="route.meta.layout == 'client'" v-model:selectedKeys="current" mode="horizontal" @click="handleClick" :items="items" />
            </a-flex>
            <a-flex gap="20" align="center">
                <a-input
                    v-if="route.meta.layout == 'client'"
                    placeholder="Tìm kiếm"
                    style="width: 500px; border-radius: 20px;"
                >
                    <template #suffix>
                        <SearchOutlined />
                    </template>
                </a-input>
                <ShoppingCartOutlined v-if="route.meta.layout == 'client'" class="icon-style" @click="redirectTo('Cart')"/>
                <UserOutlined v-if="route.meta.layout == 'client' && !userInformation" class="icon-style" @click="redirectTo('Login')"/>
                <a-dropdown v-if="userInformation" trigger="['click']">
                    <template #default>
                        <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <a-avatar size="23" :src="userInformation.avatar">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                        <span style="color: black;">{{ userInformation?.name }}</span>
                        </div>
                    </template>
                    <template #overlay>
                    <a-menu>
                        <a-menu-item @click="redirectTo('User')">
                            Thông tin tài khoản
                        </a-menu-item>
                        <a-menu-item v-if="route.meta.layout == 'client'" @click="redirectTo('ListOrder')">
                            Lịch sử mua hàng
                        </a-menu-item>
                        <a-menu-item @click="logout">
                            Đăng xuất
                        </a-menu-item>
                    </a-menu>
                    </template>
                </a-dropdown>
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
import { h, ref, onBeforeMount, watch, computed } from 'vue';
import { HomeOutlined, UnorderedListOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';

onBeforeMount(() => {
    getSelectedKey();
});

const authStore = useAuthStore();
const userInformation = computed(() => {
    return authStore.userInfo;
})
const current = ref(['Home']);
const items = ref([
    {
        key: 'Home',
        icon: () => h(HomeOutlined),
        label: 'Trang chủ',
        title: 'Trang chủ',
        router: 'Home',
    },
    {
        key: 'Category',
        icon: () => h(UnorderedListOutlined),
        label: 'Danh mục',
        title: 'Danh mục',
        router: 'Category',
    },
]);
const route = useRoute();
const router = useRouter();
const Home = ref(['Home']);
const Category = ref(['Category']);

watch(() => route.name,
    () => {
        getSelectedKey();
    },
);

//action

const getSelectedKey = () => {
    if (Category.value.includes(route.name)) {
        current.value = ['Category'];
    }
    else if (Home.value.includes(route.name)) {
        current.value = ['Home'];
    }
    else {
        current.value = [route.name];
    }
}
const redirectTo = (name) => {
    router.push({
        name: name,
    });
}

const redirectToRegister = () => {
    router.push({
        name: 'Register',
    });
}

const handleClick = menuInfo => {
    redirectToRouter(menuInfo.item.router);
}

const redirectToRouter = (name = '') => {
    router.push({
        name: name
    })
}

const logout = () => {
    authStore.logout().then(res => {
    }).catch(err => {
        console.log(err);
    })
}
</script>

<style scoped lang="scss">
    .header{
        width: 100vw;
        height: 60px;
        // background-image: url(/img/backGround.jpg);
        background-color: white;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;
        z-index: 100;
        .icon-style{
            font-size: 20px;
            color: black;
        }
        .icon-style:hover{
            cursor: pointer;
            color: blue;
        }
    }
    :deep(.ant-menu-horizontal){
        border: none;
    }
    :deep(.ant-menu-light.ant-menu-horizontal >.ant-menu-item-selected::after){
        border-bottom-width: 4px;
    }
</style>
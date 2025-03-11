<template>
    <div style="position: relative; border-right: 0.5px solid #E8E8E8; background-color: white;">
        <a-menu
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            @click="handleClick"
            :style="{width: state.collapsed? '50px': '250px'}"
            :inline-collapsed="state.collapsed"
            :items="items"
        ></a-menu>
        <div 
            class="toggle-side-menu-icon" 
            @click="toggleCollapsed"
            :style="{left: state.collapsed? '50px': '250px'}"
        >
            <span v-if="!state.collapsed">
                <svg width="14" height="66" viewBox="0 0 14 66" fill="#f0f2f5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L14 8V58L0 66V0Z" fill="#FFFFFF" style="stroke:#D9D9D9; stroke-width:1"/>
                    <line x1="0" y1="0" x2="0" y2="100" style="stroke:#F0F2F5; stroke-width:2"/>
                    <path
                        d="M9.25031 29.3291V28.3629C9.25031 28.2791 9.15406 28.2329 9.08906 28.2841L3.45406 32.6854C3.40618 32.7226 3.36744 32.7703 3.34079 32.8248C3.31415 32.8793 3.30029 32.9391 3.30029 32.9998C3.30029 33.0604 3.31415 33.1203 3.34079 33.1748C3.36744 33.2292 3.40618 33.2769 3.45406 33.3141L9.08906 37.7154C9.15531 37.7666 9.25031 37.7204 9.25031 37.6366V36.6704C9.25031 36.6091 9.22156 36.5504 9.17406 36.5129L4.67406 33.0004L9.17406 29.4866C9.22156 29.4491 9.25031 29.3904 9.25031 29.3291V29.3291Z"
                        fill="black" fill-opacity="0.45"/>
                </svg>                        
            </span>
            <span v-else>
                <svg width="14" height="66" viewBox="0 0 14 66" fill="#f0f2f5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L14 8V58L0 66V0Z" fill="#FFFFFF" style="stroke:#D9D9D9; stroke-width:1"/>
                    <line x1="0" y1="0" x2="0" y2="100" style="stroke:#F0F2F5; stroke-width:2"/>
                    <path
                        d="M9.77135 32.6853L4.13635 28.284C4.12162 28.2725 4.10393 28.2652 4.08529 28.2633C4.06666 28.2613 4.04784 28.2646 4.031 28.2728C4.01416 28.281 3.99999 28.2938 3.9901 28.3097C3.98021 28.3257 3.97501 28.3441 3.9751 28.3628V29.329C3.9751 29.3903 4.00385 29.449 4.05135 29.4865L8.55135 33.0003L4.05135 36.514C4.0026 36.5515 3.9751 36.6103 3.9751 36.6715V37.6378C3.9751 37.7215 4.07135 37.7678 4.13635 37.7165L9.77135 33.3153C9.81924 33.2779 9.85799 33.2301 9.88463 33.1756C9.91128 33.121 9.92514 33.061 9.92514 33.0003C9.92514 32.9396 9.91128 32.8796 9.88463 32.825C9.85799 32.7704 9.81924 32.7227 9.77135 32.6853Z"
                        fill="black" fill-opacity="0.45"/>
                </svg>                        
            </span>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, h, ref, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    ShopOutlined,
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const state = ref({
    collapsed: false,
    selectedKeys: [],
    openKeys: [],
    preOpenKeys: [],
});
const items = reactive([
    {
        key: 'Home',
        icon: () => h(HomeOutlined),
        label: 'Trang chủ',
        title: 'Home',
        router: 'Home'
    },
    {
        key: 'Produce',
        icon: () => h(ShopOutlined),
        label: 'Sản phẩm',
        title: 'Produce',
        children: [
            {
                key: '1',
                label: 'Sản phẩm 1',
                title: 'Sản phẩm 1',
                router: 'Produce1',
            },
            {
                key: '2',
                label: 'Sản phẩm 2',
                title: 'Sản phẩm 2',
                router: 'Produce2',
            },
            {
                key: '3',
                label: 'Sản phẩm 3',
                title: 'Sản phẩm 3',
                router: 'Produce3',
            },
        ],
    },
    {
        key: 'Cart',
        icon: () => h(ShoppingCartOutlined),
        label: 'Giỏ hàng',
        title: 'Cart',
        router: 'Cart'
    },
    {
        key: 'sub1',
        icon: () => h(SettingOutlined),
        label: 'Cài đặt',
        title: 'Cài đặt',
        children: [
            {
                key: '5',
                label: 'Thông tin chung',
                title: 'Thông tin chung',
            },
            {
                key: '6',
                label: 'Cài đặt Người dùng',
                title: 'Cài đặt Người dùng',
            },
            {
                key: '7',
                label: 'Đăng xuất',
                title: 'Đăng xuất',
            },
        ],
    },
]);

const clientSidebar = reactive([
    {
        key: 'Home',
        icon: () => h(HomeOutlined),
        label: 'Trang chủ',
        title: 'Home',
        router: 'Home'
    },
    {
        key: 'Produce',
        icon: () => h(ShopOutlined),
        label: 'Sản phẩm',
        title: 'Produce',
        children: [
            {
                key: '1',
                label: 'Sản phẩm 1',
                title: 'Sản phẩm 1',
                router: 'Produce1',
            },
            {
                key: '2',
                label: 'Sản phẩm 2',
                title: 'Sản phẩm 2',
                router: 'Produce2',
            },
            {
                key: '3',
                label: 'Sản phẩm 3',
                title: 'Sản phẩm 3',
                router: 'Produce3',
            },
        ],
    },
    {
        key: 'Cart',
        icon: () => h(ShoppingCartOutlined),
        label: 'Giỏ hàng',
        title: 'Cart',
        router: 'Cart'
    },
    {
        key: 'sub1',
        icon: () => h(SettingOutlined),
        label: 'Cài đặt',
        title: 'Cài đặt',
        children: [
            {
                key: '5',
                label: 'Thông tin chung',
                title: 'Thông tin chung',
            },
            {
                key: '6',
                label: 'Cài đặt Người dùng',
                title: 'Cài đặt Người dùng',
            },
            {
                key: '7',
                label: 'Đăng xuất',
                title: 'Đăng xuất',
            },
        ],
    },
]);


const adminSidebar = reactive([
    {
        key: 'Home',
        icon: () => h(HomeOutlined),
        label: 'Trang chủ',
        title: 'Home',
        router: 'Home'
    },
    {
        key: 'Produce',
        icon: () => h(ShopOutlined),
        label: 'Quản lý sản phẩm',
        title: 'Produce',
    },
    {
        key: 'Employee',
        icon: () => h(ShoppingCartOutlined),
        label: 'Nhân viên',
        title: 'Employee',
        router: 'Cart'
    },
    {
        key: 'Bill',
        icon: () => h(ShoppingCartOutlined),
        label: 'Hóa đơn',
        title: 'Bill',
        router: 'Cart'
    },
    {
        key: 'sub1',
        icon: () => h(SettingOutlined),
        label: 'Cài đặt',
        title: 'Cài đặt',
        children: [
            {
                key: '5',
                label: 'Thông tin chung',
                title: 'Thông tin chung',
            },
            {
                key: '6',
                label: 'Cài đặt Người dùng',
                title: 'Cài đặt Người dùng',
            },
            {
                key: '7',
                label: 'Đăng xuất',
                title: 'Đăng xuất',
            },
        ],
    },
]);
const Produce = ref(['Produce']);
const Cart = ref(['Cart']);

onBeforeMount(() => {
    getSelectedKey();
    // getSidebarKey();
});

onMounted(()=> {
});

watch(() => state.value.openKeys,(_val, oldVal) => {
    state.value.preOpenKeys = oldVal;
},);

watch(() => route.name,
    () => {
        getSelectedKey();
    },
);

const getSelectedKey = () => {
    if (Produce.value.includes(route.name)) {
        state.value.selectedKeys = ['Produce'];
    }
    else if (Cart.value.includes(route.name)) {
        state.value.selectedKeys = ['Cart'];
    } 
    else {
        state.value.selectedKeys = ['Home'];
    }
    // else if (MemberManager.value.includes(route.name)) {
    //     selectedKeys.value = ['ManagerMember'];
    // }
    // else if (BillManager.value.includes(route.name)) {
    //     selectedKeys.value = ['ManagerBill'];
    // }
    // else if (RankMemberManager.value.includes(route.name)) {
    //     selectedKeys.value = ['ManageRankMember'];
    // }
    // else if (LoyaltyProgramManager.value.includes(route.name)) {
    //     selectedKeys.value = ['ListLoyaltyProgram'];
    // }
    // else if (OrderManager.value.includes(route.name)) {
    //     selectedKeys.value = ['ListOrder'];
    // }
    // else if (PointTransactionManager.value.includes(route.name)) {
    //     selectedKeys.value = ['ListPointTransaction'];
    // }
    // else {
    //     selectedKeys.value = [route.name];
    // }
}

const toggleCollapsed = () => {
    state.value.collapsed = !state.value.collapsed;
    state.value.openKeys = state.value.collapsed ? [] : state.value.preOpenKeys;
};
const handleClick = menuInfo => {
    if(state.value.openKeys.length && !menuInfo.keyPath.includes(state.value.openKeys[0])){
        state.value.openKeys = [];
    }
    redirectToRouter(menuInfo.item.router);
}
const redirectToRouter = (name = '') => {
    router.push({
        name: name
    })
}
</script>

<style lang="scss" scoped>
    .toggle-side-menu-icon {
        cursor: pointer;
        position: absolute;
        top: 45%;
        z-index: 2;
        transition: all 0.26s ease;
        box-shadow: 8px 0px 24px 0px transparent;
    }

</style>
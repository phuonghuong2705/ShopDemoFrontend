<template>
    <div class="content">
        <div class="profile-header">
            <a-flex :gap="20">
                <a-avatar :size="80" :src="user.avatar" />
                <div>
                    <div style="font-weight: 600;">{{ user.fullName }}</div>
                    <div class="text-gray-500 text-sm">{{ user.email }}</div>
                </div>
            </a-flex>
        </div>
        <a-card class="user-infomation">
            <template #title>Thông tin người dùng</template>
            <template #extra><a-button type="primary" @click="modalChangeInfomationVisible = true">Cập nhật</a-button></template>
            <a-flex :gap="10" vertical>
                <a-flex justify="space-between">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Email</span>
                        {{ user.email }}
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Số điện thoại</span>
                        {{ user.phone }}
                    </a-flex>
                </a-flex>
                <a-flex justify="space-between">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Ngày sinh</span>
                        {{ user.email }}
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Giới tính</span>
                        {{ user.phone }}
                    </a-flex>
                </a-flex>
            </a-flex>
        </a-card>
        <a-flex style="min-width: 40vw;" justify="flex-end">
            <a-button type="primary" @click="modalChangePasswordVisible = true">Đổi mật khẩu</a-button>
        </a-flex>
        <a-modal v-model:open="modalChangePasswordVisible" title="Đổi mật khẩu" @ok="handleOk">
            <a-flex vertical :gap="10">
                <span style="font-weight: 600;">Mật khẩu hiện tại</span>
                <a-form-item>
                    <a-input v-model:value="form.firstName" />
                </a-form-item>
            </a-flex>
            <a-flex vertical :gap="10">
                <span style="font-weight: 600;">Mật khẩu mới</span>
                <a-form-item>
                    <a-input v-model:value="form.firstName" />
                </a-form-item>
            </a-flex>
            <a-flex vertical :gap="10">
                <span style="font-weight: 600;">Xác nhận mật khẩu mới</span>
                <a-form-item>
                    <a-input v-model:value="form.firstName" />
                </a-form-item>
            </a-flex>
        </a-modal>
        <a-modal v-model:open="modalChangeInfomationVisible" title="Cập nhật thông tin" @ok="handleOk">
            <a-flex :gap="10" vertical>
                <a-flex justify="space-between" :gap="20">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Email</span>
                        <a-input v-model="user.email"></a-input>
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Số điện thoại</span>
                        <a-input v-model="user.email"></a-input>
                    </a-flex>
                </a-flex>
                <a-flex justify="space-between" :gap="20">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Ngày sinh</span>
                        <a-input v-model="user.email"></a-input>
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Giới tính</span>
                        <a-input v-model="user.email"></a-input>
                    </a-flex>
                </a-flex>
            </a-flex>
        </a-modal>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'

const modalChangePasswordVisible = ref(false);
const modalChangeInfomationVisible = ref(false);

const user = reactive({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/64',
    phone: '+1 (555) 123-4567',
})

const form = reactive({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product Designer based in San Francisco, CA. Passionate about creating user-friendly interfaces.',
})
</script>

<style scoped lang="scss">
    .content{
        display: flex;
        flex-direction: column;
        padding: 40px;
        align-items: center;
        gap: 20px;
        .profile-header{
            display: flex;
            justify-content: space-between;
            gap: 20px;
            color: black;
            border: 1px gainsboro solid;
            border-radius: 10px;
            padding: 20px;
            min-width: 40vw;
        }
        .user-infomation{
            border: 1px gainsboro solid;
            min-width: 40vw;
        }
    }
</style>

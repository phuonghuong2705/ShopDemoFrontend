<template>
    <div class="content">
        <div class="profile-header">
            <a-flex :gap="20">
                <a-avatar :size="80" :src="user.avatar">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
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
                    <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
                        <input type="file" :id="('Image')" style="display: none;" accept="image/*" @change="loadFile($event)">
                        <a-tooltip placement="top">
                            <template #title>
                                <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                            </template>
                            <label :for="('Image')" style="position: relative; cursor: pointer;">
                                <a-avatar :size="100" :id="('Image')" :src="user.avatar">
                                    <template #icon><UserOutlined /></template>
                                </a-avatar>
                                <div class="add-img"><camera-outlined style="font-size: 25px;"/></div>
                            </label>
                        </a-tooltip>
                    </div>
                </a-flex>
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
import { ref, reactive } from 'vue';
import { CameraOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth.js';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();
const modalChangePasswordVisible = ref(false);
const modalChangeInfomationVisible = ref(false);

const user = reactive({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null,
    phone: '+1 (555) 123-4567',
})

const form = reactive({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product Designer based in San Francisco, CA. Passionate about creating user-friendly interfaces.',
})

async function loadFile(event){
    var ext = ref(event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase());
    if(!['gif', 'png', 'jpg', 'jpeg'].includes(ext.value) || ((event.target.files[0].size / 1024) / 1024) > 10){
        return message.error('Định dạng không hỗ trợ. Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.');
    }
    authStore.uploadFile({
        type: 1,
        file: event.target.files[0]
    })
    .then(res => {
        console.log(res);
        user.avatar = res.link;
    })
    .catch(() =>{
        message.error('Tải file thất bại');
    })
}
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
    .add-img{
        position: absolute;
        top: 50%;
        background-color: white;
        opacity: 0.5;
        width: 100%;
        height: 50%;
        border-radius: 0px 0px 100px 100px;
        justify-content: center;
        align-items: center;
        display: flex;
    }
</style>

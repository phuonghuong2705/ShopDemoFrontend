<template>
    <div class="content">
        <div class="profile-header">
            <a-flex :gap="20">
                <a-avatar :size="80" :src="userInformation?.avatar">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
                <div>
                    <div style="font-weight: 600;">{{ userInformation?.name }}</div>
                    <div class="text-gray-500 text-sm">{{ userInformation?.email }}</div>
                </div>
            </a-flex>
        </div>
        <a-card class="user-infomation">
            <template #title>Thông tin người dùng</template>
            <template #extra><a-button type="primary" @click="updatedInformation()">Cập nhật</a-button></template>
            <a-flex :gap="10" vertical>
                <a-flex justify="space-between">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Email</span>
                        {{ userInformation?.email }}
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Số điện thoại</span>
                        {{ userInformation?.phone? userInformation?.phone : 'Chưa có' }}
                    </a-flex>
                </a-flex>
                <a-flex justify="space-between">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Ngày sinh</span>
                        {{  userInformation?.birthday? userInformation?.birthday : 'Chưa rõ' }}
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Giới tính</span>
                        {{ userInformation?.gender === 0 ? 'Nam' : userInformation?.gender === 1 ? 'Nữ' : 'Chưa rõ' }}
                    </a-flex>
                </a-flex>
            </a-flex>
        </a-card>
        <a-flex style="min-width: 40vw;" justify="flex-end">
            <a-button type="primary" @click="modalChangePasswordVisible = true">Đổi mật khẩu</a-button>
        </a-flex>
        <a-modal 
            v-model:open="modalChangePasswordVisible"
            title="Đổi mật khẩu"
            @ok="handleChangePassword"
            okText="Xác nhận"
            :confirmLoading="loading"
        >
            <a-flex vertical :gap="10">
                <span style="font-weight: 600;">Mật khẩu hiện tại</span>
                <a-form-item>
                    <a-input v-model:value="updatePasswordForm.old_password" />
                </a-form-item>
            </a-flex>
            <a-flex vertical :gap="10">
                <span style="font-weight: 600;">Mật khẩu mới</span>
                <a-form-item>
                    <a-input v-model:value="updatePasswordForm.new_password" />
                </a-form-item>
            </a-flex>
            <a-flex vertical :gap="10">
                <span style="font-weight: 600;">Xác nhận mật khẩu mới</span>
                <a-form-item>
                    <a-input v-model:value="updatePasswordForm.new_password_confirmation" />
                </a-form-item>
            </a-flex>
        </a-modal>
        <a-modal
            v-model:open="modalChangeInfomationVisible"
            title="Cập nhật thông tin"
            @ok="handleUpdateInformation"
            okText="Cập nhật",
            cancelText="Hủy"
            :confirmLoading="loading"
        >
            <a-flex :gap="10" vertical>
                <a-flex justify="space-between" :gap="20">
                    <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
                        <input type="file" :id="('Image')" style="display: none;" accept="image/*" @change="loadFile($event)">
                        <a-tooltip placement="top">
                            <template #title>
                                <span>Vui lòng sử dụng file .gif, .png, .jpg, .jpeg và dung lượng dưới 10MB.</span>
                            </template>
                            <label :for="('Image')" style="position: relative; cursor: pointer;">
                                <a-avatar :size="100" :id="('Image')" :src="updateInformationForm.avatar">
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
                        <a-input v-model:value="updateInformationForm.email"></a-input>
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Số điện thoại</span>
                        <a-input v-model:value="updateInformationForm.phone"></a-input>
                    </a-flex>
                </a-flex>
                <a-flex justify="space-between" :gap="20">
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Ngày sinh</span>
                        <a-date-picker 
                            v-model:value="updateInformationForm.birthday" 
                            placeholder="Chọn ngày"
                            format="DD-MM-YYYY"
                            :allowClear="false"
                        />
                    </a-flex>
                    <a-flex vertical style="width: 50%;">
                        <span style="font-weight: 600;">Giới tính</span>
                        <a-select v-model:value="updateInformationForm.gender" :options="listGender" placeholder="Chọn một giới tính"></a-select>
                    </a-flex>
                </a-flex>
            </a-flex>
        </a-modal>
    </div>
</template>
  
<script setup>
import { ref, reactive, computed, createVNode } from 'vue';
import { CameraOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth.js';
import { message } from 'ant-design-vue';
import { useCustomerStore } from '@/stores/customer';
import dayjs from 'dayjs';
import { Modal } from 'ant-design-vue';

const authStore = useAuthStore();
const customerStore = useCustomerStore();
const loading = ref(false);

const userInformation = computed(() => {
    return authStore.userInfo;
})
const modalChangePasswordVisible = ref(false);
const modalChangeInfomationVisible = ref(false);
const listGender = ref([
    {
        label: 'Nam',
        value: 0
    },
    {
        label: 'Nữ',
        value: 1
    }
])

const updatePasswordForm = ref({
    old_password: null,
    new_password: null,
    new_password_confirmation: null,
})

const updateInformationForm = ref(null);

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
        updateInformationForm.value.avatar = res.link;
    })
    .catch(() =>{
        message.error('Tải file thất bại');
    })
}

const updatedInformation = () => {
    updateInformationForm.value = {...userInformation.value};
    console.log(userInformation.value);
    
    if(updateInformationForm.value.birthday){
        updateInformationForm.value.birthday = dayjs(userInformation.value.birthday, 'DD-MM-YYYY');
    }
    modalChangeInfomationVisible.value = true;
}

const handleUpdateInformation = async () => {
    loading.value = true;
    let params = {...updateInformationForm.value}
    if(updateInformationForm.value.birthday){
        params.birthday = dayjs(updateInformationForm.value.birthday).format('YYYY-MM-DD');
    }
    await customerStore.updateInformation(params).then(res => {
        authStore.getUser().then(res => {
        }).catch(err => {
            console.log(err);
        });
        message.destroy();
        message.success('Cập nhật thông tin thành công!');
    }).catch (err => {
        message.destroy();
        message.error('Cập nhật thông tin thất bại!');
        console.log(err);
    })
    loading.value = false;
    modalChangeInfomationVisible.value = false;
}

const handleChangePassword = async () => {
    Modal.confirm({
        title: 'Bạn có chắc chắn muốn đổi mật khẩu?',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Sau khi đổi mật khẩu bạn cần đăng nhập lại để tiếp tục phiên làm việc.',
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        onCancel() {
          Modal.destroyAll();
        },
        onOk() {
            loading.value = true;
            authStore.changePassword(updatePasswordForm.value).then(res => {
                message.destroy();
                message.success('Đổi mật khẩu thành công!');
                loading.value = false;
            }).catch (err => {
                message.destroy();
                message.error('Đổi mật khẩu thất bại!');
                console.log(err);
                loading.value = false;
            })
            modalChangeInfomationVisible.value = false;
        },
    });
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

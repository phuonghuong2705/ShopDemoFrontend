<template>
    <div class="form-background">
        <div class="form-style">
            <a-form
                :model="formData"
                name="normal_login"
                class="login-form"
                layout="vertical"
            >
                <a-form-item>
                    <a-typography-title :level="2" class="login-form-title">
                        Đăng ký
                    </a-typography-title>
                </a-form-item>

                <a-form-item
                    label="Họ tên"
                    name="name"
                    :rules="[{ required: true, message: 'Vui lòng nhập họ tên' }]"
                >
                    <a-input v-model:value="formData.name">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="Email"
                    name="email"
                    :rules="[{ required: true, message: 'Vui lòng nhập Email' }]"
                >
                    <a-input v-model:value="formData.email">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
        
                <a-form-item
                    label="Mật khẩu"
                    name="password"
                    :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
                >
                    <a-input-password v-model:value="formData.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item
                    label="Xác nhận mật khẩu"
                    name="password_confirmation"
                    :rules="[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        { validator: validateConfirmPassword }
                    ]"
                >
                    <a-input-password v-model:value="formData.password_confirmation">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="disabled" @click="register()" type="primary" html-type="submit" class="login-form-button">
                        Đăng ký
                    </a-button>
                    <div class="form-text">
                        Bạn đã có tài khoản?
                        <a-button type="link" @click="redirectToLogin()">Đăng nhập ngay!</a-button>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { notification } from 'ant-design-vue';

const authStore = useAuthStore();

// const store = authStore();
const route = useRoute();
const router = useRouter();


const formData = ref({
    email: null,
    password: null,
    password_confirmation: null,
    name: null
});

//action
const disabled = computed(() => {
    const valuesFilled = Object.values(formData.value).every(val => val && val.trim() !== '');
    const passwordMatch = formData.value.password === formData.value.password_confirmation;

    return !valuesFilled || !passwordMatch;
});

const validateConfirmPassword = (rule, value) => {
    if (value !== formData.value.password) {
        return Promise.reject('Mật khẩu xác nhận không khớp!')
    }
    return Promise.resolve()
};

const redirectToLogin = () => {
    router.push({
        name: 'Login',
    })
}

const openNotification = placement => {
    notification['error']({
        message: 'Email đã tồn tại',
        description:
        'Email đã được sử dung để đăng ký 1 tài khoản khác, vui lòng sử dụng email khác',
        placement,
    });
};

const register = () => {
    authStore.register(formData.value).then(res => {
        console.log('Success', res);
        redirectToLogin();
    }).catch(err => {
        notification.destroy();
        openNotification('top');
        console.log('Failed', err);
    })
}

</script>
<style scoped lang="scss">
    .form-background {
        display: flex;
        width: 100vw;
        height: 100vh;
        background-image: url(../../../../public/img/backGround.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        .form-style{
            width: 350px;
            height: 68%;
            display: flex;
            justify-content: center;
            border-radius: 16px;
            box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
            background-color: white;
            .login-form {
                max-width: 400px;
                min-width: 300px;
                .login-form-title{
                    display: flex;
                    padding-top: 20px;
                    align-items: flex-end;
                    justify-content: center;
                }
                .login-form-forgot {
                    float: right;
                }
                .login-form-button {
                    margin-top: 10px;
                    width: 100%;
                }
                .form-text{
                    display: flex;
                    align-items: center;
                    padding: 20px 0px 10px 0px;
                    width: 100%;
                    justify-content: center;
                    :deep(.ant-btn){
                        padding: 0px 4px;
                    }
                }
            }
        }
    }
    :deep(.ant-form-item){
        margin-bottom: 10px;
    }
    
</style>
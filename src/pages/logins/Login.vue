<template>
    <div class="form-background">
        <div class="form-style">
            <a-form
                :model="formData"
                name="normal_login"
                class="login-form"
            >
                <a-form-item>
                    <a-typography-title :level="2" class="login-form-title">
                        Đăng nhập
                    </a-typography-title>
                </a-form-item>

                <a-form-item
                    label="Email"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                    <a-input v-model:value="formData.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
        
                <a-form-item
                    label="Mật khẩu"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                    <a-input-password v-model:value="formData.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                    </a-input-password>
                </a-form-item>
        
                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formData.remember">Remember me</a-checkbox>
                    </a-form-item>
                    <a class="login-form-forgot" href="">Forgot password</a>
                </a-form-item>
            
                <a-form-item>
                    <a-button :disabled="disabled" @click="login()" type="primary" html-type="submit" class="login-form-button">
                        Log in
                    </a-button>
                    <div class="form-text">
                        Or
                        <a-button type="link" @click="redirectToRegister()">register now!</a-button>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { message } from 'ant-design-vue';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();


const formData = reactive({
    username: 'huonghp@example.com',
    password: 'password123',
    remember: true,
});

//action
const disabled = computed(() => {
    return !(formData.username && formData.password);
});
const redirectToRegister = () => {
    router.push({
        name: 'Register',
    })
}

// const login = () => {
//     let params = {
//         email: formData.username,
//         password: formData.password, 
//     }
//     store.login(params).then(res => {
//         console.log(res);
//         redirectToDashboard();
//     }).catch(err => {
//         console.log(err);
//     });
// }
const login = async () => {
    let params = {
        email: formData.username,
        password: formData.password, 
    }
      try {
        const response = await authStore.login(params);
        console.log('Login successful');
        } catch (error) {
            if(error?.data?.message == "Unauthorized.") {
                message.destroy();
                message.error("Email hoặc mật khẩu không chính xác, vui lòng kiểm tra lại!");
            } else{
                message.destroy();
                message.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
            }
            console.log('Login failed', error);
    }
}

const redirectToDashboard = () => {
    router.push({
        name: 'Dashboard',
    });
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
            height: 70%;
            display: flex;
            justify-content: center;
            border-radius: 16px;
            box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
            background-color: white;
            .login-form {
                max-width: 300px;
                .login-form-title{
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .login-form-forgot {
                    float: right;
                }
                .login-form-button {
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

    
</style>
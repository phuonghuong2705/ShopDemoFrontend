import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router';
import fiber from '@/api/fiber';
import api from '@/api/auth';
import dayjs from 'dayjs';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const route = useRoute();
    const userInfo = ref(null);
    const type = ref(null);
    //action
    const redirectToRouter = (name = '') => {
        router.push({
            name: name
        })
    }

    const uploadFile = async function  (data) {
        return new Promise(async (resolve, reject) => {
            if (!data.file) {
                reject({message: 'Thiếu file'});
                return;
            }
            try {
                let formData = new FormData();
                formData.append("type", data.type ? data.type : 1);
                formData.append("prefix", '/chatbox-v2/');
                formData.append("file", data.file);

                let res = await fiber.uploadFile(formData);

                resolve(res);
            } catch (e) {
                console.log("uploadFile:  ", e);
                reject(e);
            }
        });
    };
    const register = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.register(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const login = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.login(data);
                getUser().then(res => {
                    if(res.type == 'customer'){
                        console.log(123);
                        
                        router.push({
                            name: 'Home',
                        });
                    }else if(res.type == 'user'){
                        console.log(456);
                        
                        router.push({
                            name: 'Dashboard',
                        });
                    }
                });
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const logout = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.logout(data).then(res => {
                    redirectToRouter('Login');
                });
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const changePassword = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.changePassword(data);
                logout();
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const getUser = async function  () {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getUser();
                userInfo.value = res.data;
                type.value = res.type;
                if (res.data.birthday) {
                    userInfo.value.birthday = dayjs(res.data.birthday).format('YYYY-MM-DD');
                } else {
                    userInfo.value.birthday = null;
                }
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
  return { uploadFile, register, login, getUser, logout, changePassword, userInfo, type }
})
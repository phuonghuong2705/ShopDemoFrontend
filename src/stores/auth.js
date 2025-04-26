import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import fiber from '@/api/fiber';
import api from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
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
  return { uploadFile, register }
})
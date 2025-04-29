import { defineStore } from 'pinia'
import api from '@/api/customer';

export const useCustomerStore = defineStore('customer', () => {
    
    const updateInformation = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.updateInformation(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
  return { updateInformation, }
})
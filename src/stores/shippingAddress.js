import { defineStore } from 'pinia'
import api from '@/api/shippingAddress';

export const useShippingAddressStore = defineStore('shippingAddress', () => {
    const getListAddress = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getListAddress(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const updateAddress = async function  (data, id) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.updateAddress(data, id);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const createAddress = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.createAddress(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const deleteAddress = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.deleteAddress(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    
  return { getListAddress , updateAddress, createAddress, deleteAddress }
})
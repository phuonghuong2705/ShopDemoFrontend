import { defineStore } from 'pinia'
import api from '@/api/cart';

export const useCartStore = defineStore('cart', () => {
    const getListItem = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getListItem(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const addItemToCart = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.addItemToCart(data);
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

    const calculateTotal = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.calculateTotal(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    
  return { getListItem , addItemToCart, createAddress, deleteAddress, calculateTotal }
})
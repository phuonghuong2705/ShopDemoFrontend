import { defineStore } from 'pinia'
import api from '@/api/order';

export const useOrderStore = defineStore('order', () => {
    const getListOrder = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getListOrder(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const createOrder = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.createOrder(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const updateOrder = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.updateOrder(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const getDetailOrder = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getDetailOrder(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    
  return { getListOrder , getDetailOrder, createOrder, updateOrder }
})
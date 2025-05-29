import { defineStore } from 'pinia'
import api from '@/api/review';

export const useReviewStore = defineStore('review', () => {
    const createReview = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.createReview(data);
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
    
  return { createReview , getDetailOrder, createOrder, updateOrder }
})
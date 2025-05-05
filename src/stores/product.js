import { defineStore } from 'pinia'
import api from '@/api/product';

export const useProductStore = defineStore('product', () => {
    const getListBookVariant = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getListBookVariant(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const getListBook = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getListBook(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const getDetailBook = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.getDetailBook(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const updateBook = async function  (data, id) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.updateBook(data, id);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

    const createBook = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.createBook(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }
    const deleteBook = async function  (data) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await api.deleteBook(data);
                resolve(res);
            } catch (e) {
                console.log("err: ", e);
                reject(e);
            }
        });
    }

  return { getListBookVariant, getListBook, getDetailBook, updateBook, createBook, deleteBook }
})
import axios from 'axios';
import { create } from 'lodash';

export default {
    getListReview: (data) => {
        const searchParams = new URLSearchParams(data);
        const url = `${process.env.api}/get-list-order?` + searchParams;
        return new Promise((resolve, reject) => {
            axios.get(url, {
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                    resolve(response);
                }).catch((response) => {
                    reject(response);
                })
        });
    },

    createReview: (data) => {
        const url = `${process.env.api}/reviews`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                    resolve(response);
                }).catch((response) => {
                    reject(response);
                })
        });
    },
    updateOrder: (data) => {
        const url = `${process.env.api}/update-order`;
        return new Promise((resolve, reject) => {
            axios.patch(url, data, {
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                    resolve(response);
                }).catch((response) => {
                    reject(response);
                })
        });
    },
    getDetailOrder: (id) => {
        const url = `${process.env.api}/get-detail-order/${id}`;
        return new Promise((resolve, reject) => {
            axios.get(url, {
                withCredentials: true,
            })
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                    resolve(response);
                }).catch((response) => {
                    reject(response);
                })
        });
    },
}
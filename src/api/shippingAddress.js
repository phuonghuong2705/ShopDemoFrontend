import axios from 'axios';
import { create } from 'lodash';

export default {
    getListAddress: (data) => {
        const searchParams = new URLSearchParams(data);
        const url = `${process.env.api}/get-list-address`;
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

    updateAddress: (data, id) => {
        const url = `${process.env.api}/update-address/${id}`;
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
    createAddress: (data) => {
        const url = `${process.env.api}/create-address`;
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
    deleteAddress: (id) => {
        const url = `${process.env.api}/delete-address/${id}`;
        return new Promise((resolve, reject) => {
            axios.delete(url, {
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
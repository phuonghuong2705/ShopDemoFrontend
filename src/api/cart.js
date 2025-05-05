import axios from 'axios';
import { create } from 'lodash';

export default {
    getListItem: (data) => {
        const searchParams = new URLSearchParams(data);
        const url = `${process.env.api}/cart`;
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

    addItemToCart: (data) => {
        const url = `${process.env.api}/add-to-cart`;
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
    calculateTotal: (data) => {
        const url = `${process.env.api}/calculate-total`;
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
}
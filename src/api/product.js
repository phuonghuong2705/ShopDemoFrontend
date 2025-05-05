import axios from 'axios';
import { create } from 'lodash';

export default {
    getListBookVariant: (data) => {
        const searchParams = new URLSearchParams(data);
        const url = `${process.env.api}/book-variants?`+ searchParams;
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
    getListBook: (data) => {
        const searchParams = new URLSearchParams(data);
        const url = `${process.env.api}/books?`+ searchParams;
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
    getDetailBook: (data) => {
        const searchParams = new URLSearchParams(data);
        const url = `${process.env.api}/detail-book?`+ searchParams;
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

    updateBook: (data, id) => {
        const url = `${process.env.api}/update-book/${id}`;
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
    createBook: (data) => {
        const url = `${process.env.api}/create-book`;
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
    deleteBook: (id) => {
        const url = `${process.env.api}/delete-book/${id}`;
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
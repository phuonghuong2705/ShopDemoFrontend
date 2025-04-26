import axios from 'axios';
// import {store} from "../stores/index";

export default {
    register: (data) => {
        const url = `${process.env.api}/register`;
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
    login: (data) => {
        const url = `http://localhost:8000/api/auth/login`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {
                withCredentials: true,
            })
                .then((response) => {
                    // if (response.data.status) {
                    //     resolve(response.data.data);
                    // } else {
                    //     reject(response);
                    // }
                    resolve(response);
                }).catch((response) => {
                    reject(response);
                })
        });
    },
    getUser: (data) => {
        const url = `http://localhost:8000/api/me`;
        return new Promise((resolve, reject) => {
            axios.get(url, {
                withCredentials: true,
            })
                .then((response) => {

                    resolve(response);
                }).catch((response) => {
                    reject(response);
                })
        });
    },
}
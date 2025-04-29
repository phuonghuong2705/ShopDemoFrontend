import axios from 'axios';

export default {
    updateInformation: (data) => {
        const url = `${process.env.api}/update-customer`;
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
}
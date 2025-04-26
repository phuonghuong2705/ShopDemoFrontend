import axios from "axios";

export default {
    uploadFile: (data) => {
        const url = `${process.env.fiberApi}/v1.0/file/upload`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response);
                
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response.data);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },
}
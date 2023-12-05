import axiosConfig from "../axiosConfig";

export const apiGetImages = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/image/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateImages = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/image/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateImages = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/image/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
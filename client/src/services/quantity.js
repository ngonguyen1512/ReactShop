import axiosConfig from "../axiosConfig";

export const apiGetQuantities = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/quantity/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateQuantities = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/quantity/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateQuantities = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/quantity/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
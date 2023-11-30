import axiosConfig from "../axiosConfig";

export const apiGetColors = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/color/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateColors = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/color/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateColors = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/color/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
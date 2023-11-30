import axiosConfig from "../axiosConfig";

export const apiGetDimensions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/dimension/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateDimensions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/dimension/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateDimensions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/dimension/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
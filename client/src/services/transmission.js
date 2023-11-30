import axiosConfig from "../axiosConfig";

export const apiGetTransmissions = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/transmission/all',
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllsTransmissions = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/transmission/alls',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateTransmissions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/transmission/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteTransmissions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/transmission/delete',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateTransmissions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/transmission/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
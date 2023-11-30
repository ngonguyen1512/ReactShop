import axiosConfig from '../axiosConfig'

export const apiGetFunctions = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/function/all',
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllsFunctions = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/function/alls',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateFunction = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/function/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteFunctions = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/function/delete',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateFunctions = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/function/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
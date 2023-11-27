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

export const apiCreateFunction = (payloadf) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/function/create',
            data: payloadf,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteFunctions = (payloadf) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/function/delete',
            data: payloadf
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateFunctions = (payloadf) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/function/update',
            data: payloadf
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
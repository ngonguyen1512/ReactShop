import axiosConfig from "../axiosConfig";

export const apiGetSamples = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/sample/depend',
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllSamples = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/sample/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateSamples = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/sample/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateSamples = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/sample/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteSamples = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/sample/delete',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
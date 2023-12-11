import axiosConfig from "../axiosConfig";

export const apiGetProducts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/product/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetProductsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/product/limit`,
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateProducts = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/product/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateProducts = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/product/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
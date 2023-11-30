import axiosConfig from "../axiosConfig";

export const apiGetSlides = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/slide/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateSlides = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/slide/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteSlides = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/slide/delete',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateSlides = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/slide/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
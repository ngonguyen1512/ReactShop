import axiosConfig from "../axiosConfig";

export const apiGetLikes = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/like/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateLikes = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/like/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteLikes = (updatedPayload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/like/delete',
            data: updatedPayload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
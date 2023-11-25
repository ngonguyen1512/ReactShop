import axiosConfig from "../axiosConfig";

export const apiGetMenus = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/menu/all',
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateMenus = (payloadm) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/menu/create',
            data: payloadm,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteMenus = (payloadm) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/menu/delete',
            data: payloadm
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateMenus = (payloadm) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/menu/update',
            data: payloadm
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
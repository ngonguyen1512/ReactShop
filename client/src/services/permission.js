import axiosConfig from "../axiosConfig";

export const apiGetPermissions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/permission/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreatePermissions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/permission/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdatePermissions = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/permission/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
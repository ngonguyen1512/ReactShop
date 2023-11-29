import axiosConfig from "../axiosConfig";

export const apiGetPermissions = (payload) => new Promise(async(resolve, reject) => {
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
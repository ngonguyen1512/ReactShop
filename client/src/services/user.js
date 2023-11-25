import axiosConfig from "../axiosConfig";

export const apiGetCurrent = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/user/getcurrent',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
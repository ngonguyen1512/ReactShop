import axiosConfig from "../axiosConfig";

export const apiGetTransmissions = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/transmission/all',
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllsTransmissions = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/transmission/alls',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
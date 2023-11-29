import axiosConfig from "../axiosConfig";

export const apiGetAllocations = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/allocation/all',
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetAllsAllocations = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/allocation/alls',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
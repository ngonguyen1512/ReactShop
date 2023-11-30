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

export const apiCreateAllocations = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/allocation/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteAllocations = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/allocation/delete',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateAllocations = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/allocation/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
import axiosConfig from "../axiosConfig";

export const apiGetTransfers = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/transfer/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateTransfers = (payloadt) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/transfer/create',
            data: payloadt,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteTransfers = (payloadtt) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/transfer/delete',
            data: payloadtt
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateTransfers = (payloadt) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/transfer/update',
            data: payloadt
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
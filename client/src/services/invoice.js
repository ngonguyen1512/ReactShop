import axiosConfig from '../axiosConfig'

export const apiGetCountInvoices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/invoice/count`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateInvoices = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/invoice/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetInvoices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/invoice/all`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateInvoices = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/invoice/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetTopSelling = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/invoice/topselling`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
import axiosConfig from '../axiosConfig';

export const apiGetAccounts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/account/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateAccountsByAdmin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/account/updatebyad',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateAccountOne = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/account/updateone',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
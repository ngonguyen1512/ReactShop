import axiosConfig from "../axiosConfig";

export const apiGetStates = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/state/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateStates = (payloadt) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/state/create',
            data: payloadt,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateStates = (payloadt) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/state/update',
            data: payloadt
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
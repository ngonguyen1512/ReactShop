import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getSamples = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetSamples(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SAMPLE,
                sampledepend: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_SAMPLE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SAMPLE,
            data: null,
        })
    }
}

export const getAllSamples = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAllSamples();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AllS_SAMPLE,
                samples: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_AllS_SAMPLE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AllS_SAMPLE,
            samples: null,
        })
    }
}

export const createSamples = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateSamples(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_SAMPLE,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_SAMPLE,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_SAMPLE,
            msg: 'Failed to create sample.',
        });
    }
};

export const updateSamples = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateSamples(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_SAMPLE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_SAMPLE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_SAMPLE,
            data: null,
        })
    }
}

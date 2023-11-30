import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getTransmissions = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetTransmissions(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TRANSMISSION,
                transmissions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_TRANSMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TRANSMISSION,
            data: null,
        })
    }
}

export const getAllsTransmissions = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAllsTransmissions();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AllS_TRANSMISSION,
                alltransmissions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_AllS_TRANSMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AllS_TRANSMISSION,
            data: null,
        })
    }
}

export const createTransmissions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateTransmissions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_TRANSMISSION,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_TRANSMISSION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_TRANSMISSION,
            msg: 'Failed to create menu.',
        });
    }
};

export const deleteTransmissions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteTransmissions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_TRANSMISSION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_TRANSMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_TRANSMISSION,
            data: null,
        })
    }
}

export const updateTransmissions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateTransmissions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_TRANSMISSION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_TRANSMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_TRANSMISSION,
            data: null,
        })
    }
}
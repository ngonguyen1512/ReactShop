import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getTransfers = () => async (dispatch) => {
    try {
        const response = await apis.apiGetTransfers();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TRANSFER,
                transfers: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_TRANSFER,
                msg: response.data.msg,
                transfers: null,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TRANSFER,
            data: null,
        })
    }
}

export const createTransfers = (payloadt) => async (dispatch) => {
    try {
        const response = await apis.apiCreateTransfers(payloadt);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_TRANSFER,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_TRANSFER,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_TRANSFER_FAIL,
            msg: 'Failed to create transfer.',
        });
    }
};

export const deleteTransfers = (payloadtt) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteTransfers(payloadtt);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_TRANSFER,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_TRANSFER,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_TRANSFER,
            data: null,
        })
    }
}

export const updateTransfers = (payloadt) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateTransfers(payloadt);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_TRANSFER,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_TRANSFER,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_TRANSFER,
            data: null,
        })
    }
}
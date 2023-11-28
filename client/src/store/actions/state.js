import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getStates = () => async (dispatch) => {
    try {
        const response = await apis.apiGetStates();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_STATE,
                states: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_STATE,
                msg: response.data.msg,
                states: null,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_STATE,
            data: null,
        })
    }
}

export const createStates = (payloadt) => async (dispatch) => {
    try {
        const response = await apis.apiCreateStates(payloadt);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_STATE,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_STATE,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_STATE,
            msg: 'Failed to create states.',
        });
    }
};

export const deleteStates = (payloadtt) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteStates(payloadtt);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_STATE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_STATE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_STATE,
            data: null,
        })
    }
}

export const updateStates = (payloadt) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateStates(payloadt);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_STATE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_STATE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_STATE,
            data: null,
        })
    }
}
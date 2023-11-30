import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getDimensions = () => async (dispatch) => {
    try {
        const response = await apis.apiGetDimensions();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_DIMENSION,
                dimensions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_DIMENSION,
                msg: response.data.msg,
                dimensions: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_DIMENSION,
            dimensions: null,
        })
    }
}

export const createDimensions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateDimensions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_DIMENSION,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_DIMENSION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_DIMENSION,
            msg: 'Failed to create dimension.',
        });
    }
};

export const updateDimensions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateDimensions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_DIMENSION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_DIMENSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_DIMENSION,
            data: null,
        })
    }
}
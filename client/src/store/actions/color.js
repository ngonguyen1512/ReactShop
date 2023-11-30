import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getColors = () => async (dispatch) => {
    try {
        const response = await apis.apiGetColors();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_COLOR,
                colors: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_COLOR,
                msg: response.data.msg,
                colors: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_COLOR,
            colors: null,
        })
    }
}

export const createColors = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateColors(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_COLOR,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_COLOR,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_COLOR,
            msg: 'Failed to create color.',
        });
    }
};

export const updateColors = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateColors(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_COLOR,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_COLOR,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_COLOR,
            data: null,
        })
    }
}
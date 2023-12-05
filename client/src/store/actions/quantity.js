import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getQuantities = () => async (dispatch) => {
    try {
        const response = await apis.apiGetQuantities();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_QUANTITY,
                quantities: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_QUANTITY,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_QUANTITY,
            data: null,
        })
    }
}

export const createQuantities = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateQuantities(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_QUANTITY,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_QUANTITY,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_QUANTITY,
            msg: 'Failed to create product.',
        });
    }
};

export const updateQuantities = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateQuantities(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_QUANTITY,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_QUANTITY,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_QUANTITY,
            data: null,
        })
    }
}

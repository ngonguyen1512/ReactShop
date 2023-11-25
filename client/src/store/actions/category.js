import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null,
        })
    }
}

export const createCategories = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateCategories(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_CATEGORIES,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_CATEGORIES,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_CATEGORIES,
            msg: 'Failed to create category.',
        });
    }
};

export const updateCategories = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateCategories(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_CATEGORIES,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_CATEGORIES,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_CATEGORY,
            data: null,
        })
    }
}

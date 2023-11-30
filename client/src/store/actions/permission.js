import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getPermissions = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPermissions();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PERMISSION,
                permissions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_PERMISSION,
                msg: response.data.msg,
                permissions: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PERMISSION,
            permissions: null,
        })
    }
}

export const createPermissions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreatePermissions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_PERMISSION,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_PERMISSION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_PERMISSION,
            msg: 'Failed to create permissions.',
        });
    }
};

export const updatePermissions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdatePermissions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_PERMISSION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_PERMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PERMISSION,
            data: null,
        })
    }
}
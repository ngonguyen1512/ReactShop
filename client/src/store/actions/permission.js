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
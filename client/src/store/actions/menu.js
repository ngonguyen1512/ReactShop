import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getMenus = () => async (dispatch) => {
    try {
        const response = await apis.apiGetMenus();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_MENU,
                menus: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_MENU,
                msg: response.data.msg,
                menus: null,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_MENU,
            data: null,
        })
    }
}

export const createMenus = (payloadm) => async (dispatch) => {
    try {
        const response = await apis.apiCreateMenus(payloadm);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_MENU,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_MENU,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_MENU,
            msg: 'Failed to create menu.',
        });
    }
};

export const deleteMenus = (payloadm) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteMenus(payloadm);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_MENU,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_MENU,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_MENU,
            data: null,
        })
    }
}

export const updateMenus = (payloadm) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateMenus(payloadm);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_MENU,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_MENU,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_MENU,
            data: null,
        })
    }
}
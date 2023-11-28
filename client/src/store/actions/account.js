import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getAccounts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAccounts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ACCOUNT,
                accounts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_ACCOUNT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACCOUNT,
            accounts: null,
        })
    }
}

export const updateAccountsByAdmin = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateAccountsByAdmin(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_ACCOUNT_BYAD,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_ACCOUNT_BYAD,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_ACCOUNT_BYAD,
            data: null,
        })
    }
}

export const updateAccountOne = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateAccountOne(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_ACCOUNT_ONE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_ACCOUNT_ONE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_ACCOUNT_ONE,
            data: null,
        })
    }
}
import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getFunctions = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetFunctions(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_FUNCTION,
                functions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_FUNCTION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_FUNCTION,
            data: null,
        })
    }
}
export const getAllsFunctions = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAllsFunctions();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AllS_FUNCTION,
                allfunctions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_AllS_FUNCTION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AllS_FUNCTION,
            data: null,
        })
    }
}

export const createFunction = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateFunction(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_FUNCTION,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_FUNCTION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_FUNCTION,
            msg: 'Failed to create function.',
        });
    }
};

export const deleteFunctions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteFunctions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_FUNCTION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_FUNCTION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_FUNCTION,
            data: null,
        })
    }
}

export const updateFunctions = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateFunctions(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_FUNCTION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_FUNCTION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_FUNCTION,
            data: null,
        })
    }
}
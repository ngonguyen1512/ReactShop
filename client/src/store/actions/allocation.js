import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getAllocations = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetAllocations(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALLOCATION,
                allocations: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_ALLOCATION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALLOCATION,
            data: null,
        })
    }
}

export const getAllsAllocations = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAllsAllocations();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AllS_ALLOCATION,
                allallocations: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_AllS_ALLOCATION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AllS_ALLOCATION,
            data: null,
        })
    }
}

export const createAllocations = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateAllocations(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_ALLOCATION,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_ALLOCATION,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_ALLOCATION,
            msg: 'Failed to create menu.',
        });
    }
};

export const deleteAllocations = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteAllocations(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_ALLOCATION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_ALLOCATION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_ALLOCATION,
            data: null,
        })
    }
}

export const updateAllocations = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateAllocations(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_ALLOCATION,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_ALLOCATION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_ALLOCATION,
            data: null,
        })
    }
}
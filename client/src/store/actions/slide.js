import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getSlides = () => async (dispatch) => {
    try {
        const response = await apis.apiGetSlides();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SLIDE,
                slides: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_SLIDE,
                msg: response.data.msg,
                slides: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SLIDER,
            slides: null,
        })
    }
}

export const createSlides = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateSlides(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_SLIDE,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_SLIDE,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_SLIDE,
            msg: 'Failed to create SLIDE.',
        });
    }
};

export const deleteSlides = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiDeleteSlides(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_SLIDE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.DELETE_SLIDE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_SLIDE,
            data: null,
        })
    }
}

export const updateSlides = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateSlides(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_SLIDE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_SLIDE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_SLIDE,
            data: null,
        })
    }
}
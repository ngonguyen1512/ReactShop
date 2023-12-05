import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getImages = () => async (dispatch) => {
    try {
        const response = await apis.apiGetImages();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_IMAGE,
                images: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_IMAGE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_IMAGE,
            data: null,
        })
    }
}

export const createImages = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateImages(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_IMAGE,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_IMAGE,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_IMAGE,
            msg: 'Failed to create product.',
        });
    }
};

export const updateImages = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateImages(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_IMAGE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_IMAGE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_IMAGE,
            data: null,
        })
    }
}

import actionTypes from './actionTypes';
import * as apis from '../../services/product';

export const getProducts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProducts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCT,
                products: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT,
            data: null,
        })
    }
}

export const getProductsLimit = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetProductsLimit(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCT_LIMIT,
                products_limit: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT_LIMIT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_LIMIT,
            data: null,
        })
    }
}

export const createProducts = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateProducts(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_PRODUCT,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_PRODUCT,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_PRODUCT,
            msg: 'Failed to create product.',
        });
    }
};

export const updateProducts = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateProducts(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_PRODUCT,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_PRODUCT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PRODUCT,
            data: null,
        })
    }
}

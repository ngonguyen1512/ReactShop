import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getCountInvoices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCountInvoices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_COUNT_INVOICE,
                invoices: response.data.response?.rows,
                countci: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_COUNT_INVOICE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_COUNT_INVOICE,
            data: null,
        })
    }
}

export const createInvoices = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateInvoices(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_INVOICE,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_INVOICE,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_INVOICE,
            msg: 'Failed to create invoice.',
        });
    }
};

export const getInvoices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetInvoices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_INVOICE,
                invoicesall: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_INVOICE,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_INVOICE,
            msg: 'Failed to get invoice.',
        });
    }
};

export const updateInvoices = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateInvoices(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_INVOICE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_INVOICE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_INVOICE,
            data: null,
        })
    }
}
export const completeInvoices = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCompleteInvoices(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.COMPLETE_INVOICE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.COMPLETE_INVOICE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.COMPLETE_INVOICE,
            data: null,
        })
    }
}

export const getTopSelling = () => async (dispatch) => {
    try {
        const response = await apis.apiGetTopSelling();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOPSELLING,
                topselling: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_TOPSELLING,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOPSELLING,
            msg: 'Failed to get top selling.',
        });
    }
};
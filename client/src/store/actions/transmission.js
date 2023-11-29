import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getTransmissions = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetTransmissions(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TRANSMISSION,
                transmissions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_TRANSMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TRANSMISSION,
            data: null,
        })
    }
}
export const getAllsTransmissions = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAllsTransmissions();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AllS_TRANSMISSION,
                alltransmissions: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_AllS_TRANSMISSION,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AllS_TRANSMISSION,
            data: null,
        })
    }
}
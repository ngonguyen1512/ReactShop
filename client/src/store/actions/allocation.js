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
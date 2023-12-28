import actionTypes from "../actions/actionTypes";

const initState = {
    msg: '',
    transfers: [],
}

const transferReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRANSFER:
            return {
                ...state,
                transfers: action.transfers || {},
                msg: action.msg || '',
            }

        case actionTypes.CREATE_TRANSFER:
            return {
                ...state,
                transfers: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.DELETE_TRANSFER:
            return {
                ...state,
                transfers: action.data,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_TRANSFER:
            return {
                ...state,
                transfers: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default transferReducer;
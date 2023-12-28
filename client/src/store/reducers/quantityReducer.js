import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    update: false,
    quantities: [],
}

const quantityReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_QUANTITY:
            return {
                ...state,
                quantities: action.quantities || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_QUANTITY:
            return {
                ...state,
                quantities: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_QUANTITY:
            return {
                ...state,
                quantities: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default quantityReducer;
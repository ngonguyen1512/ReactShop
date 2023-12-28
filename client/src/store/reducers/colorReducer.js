import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    colors: [],
}

const colorReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_COLOR:
            return {
                ...state,
                colors: action.colors || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_COLOR:
            return {
                ...state,
                colors: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_COLOR:
            return {
                ...state,
                colors: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default colorReducer;
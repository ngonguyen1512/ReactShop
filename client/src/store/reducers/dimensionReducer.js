import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    dimensions: [],
}

const dimensionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_DIMENSION:
            return {
                ...state,
                dimensions: action.dimensions || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_DIMENSION:
            return {
                ...state,
                dimensions: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_DIMENSION:
            return {
                ...state,
                dimensions: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default dimensionReducer;
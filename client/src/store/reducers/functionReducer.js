import actionTypes from "../actions/actionTypes";
const initState = {
    functions: [],
    msg: '',
    allfunctions: [],
    update: false,
}

const functionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_FUNCTION:
            return {
                ...state,
                functions: action.functions || [],
                msg: action.msg || '',
            } 
        case actionTypes.GET_AllS_FUNCTION:
            return {
                ...state,
                allfunctions: action.allfunctions || [],
                msg: action.msg || '',
            } 
        case actionTypes.CREATE_FUNCTION:
            return {
                ...state,
                allfunctions: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.DELETE_FUNCTION:
            return {
                ...state,
                allfunctions: action.data,
                msg: action.msg || '',
            }  
        case actionTypes.UPDATE_FUNCTION:
            return {
                ...state,
                allfunctions: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default functionReducer;
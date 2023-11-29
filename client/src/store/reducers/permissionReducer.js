import actionTypes from "../actions/actionTypes";
const initState = {
    permissions: [],
    msg: '',
}

const permissionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PERMISSION:
            return {
                ...state,
                permissions: action.permissions || [],
                msg: action.msg || '',
            }
        default:
            return state;    
    }
}

export default permissionReducer;
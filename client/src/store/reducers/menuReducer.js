import actionTypes from "../actions/actionTypes";

const initState = {
    menus: [],
    msg: '',
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_MENU:
            return {
                ...state,
                menus: action.menus || {},
                msg: action.msg || '',
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                msg: action.msg || '',
                menus: {}
            }   
        case actionTypes.CREATE_MENU:
            return {
                ...state,
                menus: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.DELETE_MENU:
            return {
                ...state,
                menus: action.data,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_MENU:
            return {
                ...state,
                menus: action.data,
                msg: action.msg || '',
            }
        default:
            return state; 
    }
}

export default userReducer;
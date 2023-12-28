import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    likes: [],
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIKE:
            return {
                ...state,
                likes: action.likes,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_LIKE:
            return {
                ...state,
                likes: action.data,
                msg: action.msg || '',
            }
        case actionTypes.DELETE_LIKE:
            return {
                ...state,
                likes: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default appReducer;
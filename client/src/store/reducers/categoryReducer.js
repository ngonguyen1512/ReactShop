import actionTypes from "../actions/actionTypes";
const initState = {
    categories: [],
    msg: '',
    count: 0,
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_CATEGORIES:
            return {
                ...state,
                categories: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_CATEGORIES:
            return {
                ...state,
                categories: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default categoryReducer;
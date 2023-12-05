import actionTypes from "../actions/actionTypes";
const initState = {
    images: [],
    msg: '',
    update: false,
}

const imageReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_IMAGE:
            return {
                ...state,
                images: action.images || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_IMAGE:
            return {
                ...state,
                images: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_IMAGE:
            return {
                ...state,
                images: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default imageReducer;
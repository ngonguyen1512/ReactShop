import actionTypes from "../actions/actionTypes";
const initState = {
    slides: [],
    msg: '',
    update: false,
}

const slideReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_SLIDE:
            return {
                ...state,
                slides: action.slides || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_SLIDE:
            return {
                ...state,
                slides: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.DELETE_SLIDE:
            return {
                ...state,
                slides: action.data,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_SLIDE:
            return {
                ...state,
                slides: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default slideReducer;
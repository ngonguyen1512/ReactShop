import actionTypes from "../actions/actionTypes";

const initState = {
    states: [],
    msg: '',
}

const stateReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_STATE:
            return {
                ...state,
                states: action.states || {},
                msg: action.msg || '',
            }

        case actionTypes.CREATE_STATE:
            return {
                ...state,
                states: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_STATE:
            return {
                ...state,
                states: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default stateReducer;
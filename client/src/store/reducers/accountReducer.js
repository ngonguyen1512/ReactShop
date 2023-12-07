import actionTypes from "../actions/actionTypes";
const initState = {
    accounts: [],
    msg: '',
    count: 0,
}

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACCOUNT:
            return {
                ...state,
                accounts: action.accounts || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_ACCOUNT:
            return {
                ...state,
                accounts: action.data,
                msg: ''
            }
        case actionTypes.UPDATE_ACCOUNT_BYAD:
            return {
                ...state,
                accounts: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_ACCOUNT_ONE:
            return {
                ...state,
                accounts: action.data,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_ACCOUNT_PASS:
            return {
                ...state,
                accounts: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default accountReducer;
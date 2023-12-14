import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    invoices: [],
    invoicesall: [],
    topselling: [],
    invoiceaccount: [],
    countci: 0,
}

const invoiceReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUNT_INVOICE:
            return {
                ...state,
                msg: action.msg || '',
                invoices: action.invoices,
                countci: action.countci || 0
            }
        case actionTypes.CREATE_INVOICE:
            return {
                ...state,
                invoices: action.data,
                msg: action.msg || '',
            }
        case actionTypes.GET_INVOICE:
            return {
                ...state,
                msg: action.msg || '',
                invoicesall: action.invoicesall,
            }
        case actionTypes.UPDATE_INVOICE:
            return {
                ...state,
                invoicesall: action.data,
                msg: action.msg || '',
            }
        case actionTypes.COMPLETE_INVOICE:
            return {
                ...state,
                invoicesall: action.data,
                msg: action.msg || '',
            }
        case actionTypes.GET_TOPSELLING:
            return {
                ...state,
                msg: action.msg || '',
                topselling: action.topselling,
            }
        default:
            return state;
    }

}

export default invoiceReducer;
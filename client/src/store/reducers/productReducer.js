import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    countp: 0,
    products: [],
    productid: [],
    update: false,
    products_limit: [],
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT:
            return {
                ...state,
                products: action.products || [],
                msg: action.msg || '',
                countp: action.countp || 0
            }
        case actionTypes.GET_PRODUCT_LIMIT:
            return {
                ...state,
                products_limit: action.products_limit || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.CREATE_PRODUCT:
            return {
                ...state,
                products: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_PRODUCT:
            return {
                ...state,
                products: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default productReducer;
import actionTypes from "../actions/actionTypes";
const initState = {
    products: [],
    // productall: [],
    msg: '',
    countp: 0,
    // newProducts: [],
    productid: [],
    update: false,
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
        // case actionTypes.GET_PRODUCTS_LIMIT:
        //     return {
        //         ...state,
        //         products: action.products || [],
        //         msg: action.msg || '',
        //         countp: action.countp || 0
        //     } 
        // case actionTypes.GET_NEW_PRODUCTS:
        //     return {
        //         ...state,
        //         msg: action.msg || '',
        //         newProducts: action.newProducts || []
        //     } 
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
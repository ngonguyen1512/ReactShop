import actionTypes from "../actions/actionTypes";
const initState = {
    allocations: [],
    msg: '',
    allallocations: [],
}

const allocationReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALLOCATION:
            return {
                ...state,
                allocations: action.allocations || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_AllS_ALLOCATION:
            return {
                ...state,
                allallocations: action.allallocations || [],
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default allocationReducer;
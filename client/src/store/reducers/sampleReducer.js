import actionTypes from "../actions/actionTypes";
const initState = {
    samples: [],
    msg: '',
    sampledepend: [],
    update: false,
}

const sampleReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_FUNCTION:
            return {
                ...state,
                sampledepend: action.sampledepend || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_AllS_SAMPLE:
            return {
                ...state,
                samples: action.samples || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_SAMPLE:
            return {
                ...state,
                samples: action.data || [],
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_SAMPLE:
            return {
                ...state,
                samples: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default sampleReducer;
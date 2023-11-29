import actionTypes from "../actions/actionTypes";
const initState = {
    transmissions: [],
    msg: '',
    alltransmissions: [],
}

const transmissionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRANSMISSION:
            return {
                ...state,
                transmissions: action.transmissions || [],
                msg: action.msg || '',
            } 
        case actionTypes.GET_AllS_TRANSMISSION:
            return {
                ...state,
                alltransmissions: action.alltransmissions || [],
                msg: action.msg || '',
            } 
        default:
            return state;
    }

}

export default transmissionReducer;
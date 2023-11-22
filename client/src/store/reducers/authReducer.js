import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default authReducer;
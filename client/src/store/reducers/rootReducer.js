import authReducer from "./authReducer";
import userReducer from "./userReducer";
import menuReducer from "./menuReducer";
import stateReducer from "./stateReducer";
import functionReducer from "./functionReducer";
import transferReducer from "./transferReducer";
import categoryReducer from "./categoryReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    menu: menuReducer,
    state: stateReducer,
    function: functionReducer,
    transfer: transferReducer,
    category: categoryReducer,
})

export default rootReducer;
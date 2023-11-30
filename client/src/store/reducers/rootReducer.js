import authReducer from "./authReducer";
import userReducer from "./userReducer";
import menuReducer from "./menuReducer";
import colorReducer from "./colorReducer";
import slideReducer from "./slideReducer";
import stateReducer from "./stateReducer";
import sampleReducer from "./sampleReducer";
import accountReducer from "./accountReducer";
import functionReducer from "./functionReducer";
import transferReducer from "./transferReducer";
import categoryReducer from "./categoryReducer";
import dimensionReducer from "./dimensionReducer";
import allocationReducer from "./allocationReducer";
import permissionReducer from "./permissionReducer";
import transmissionReducer from "./transmissionReducer";
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
    color: colorReducer,
    slide: slideReducer,
    state: stateReducer,
    sample: sampleReducer,
    account: accountReducer,
    function: functionReducer,
    transfer: transferReducer,
    category: categoryReducer,
    dimension: dimensionReducer,
    allocation: allocationReducer,
    permission: permissionReducer,
    transmission: transmissionReducer,
})

export default rootReducer;
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import menuReducer from "./menuReducer";
import colorReducer from "./colorReducer";
import slideReducer from "./slideReducer";
import stateReducer from "./stateReducer";
import imagesReducer from "./imageReducer"
import sampleReducer from "./sampleReducer";
import accountReducer from "./accountReducer";
import productReducer from "./productReducer";
import invoiceReducer from "./invoiceReducer";
import functionReducer from "./functionReducer";
import transferReducer from "./transferReducer";
import categoryReducer from "./categoryReducer";
import quantityReducer from "./quantityReducer";
import dimensionReducer from "./dimensionReducer";
import allocationReducer from "./allocationReducer";
import permissionReducer from "./permissionReducer";
import transmissionReducer from "./transmissionReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import imageReducer from "./imageReducer";

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
    app: appReducer,
    user: userReducer,
    menu: menuReducer,
    color: colorReducer,
    slide: slideReducer,
    state: stateReducer,
    image: imageReducer,
    sample: sampleReducer,
    invoice: invoiceReducer,
    account: accountReducer,
    product: productReducer,
    function: functionReducer,
    transfer: transferReducer,
    category: categoryReducer,
    quantity: quantityReducer,
    dimension: dimensionReducer,
    allocation: allocationReducer,
    permission: permissionReducer,
    transmission: transmissionReducer,
})

export default rootReducer;
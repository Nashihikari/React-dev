import { legacy_createStore, combineReducers } from "redux";
import handleNum from "./NumStatus/reducer.ts"
import handleArr from "./ArrStatus/reducer.ts"
const reducers = combineReducers({
    handleNum,
    handleArr
})
const store = legacy_createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
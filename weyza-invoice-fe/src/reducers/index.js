import { combineReducers } from "redux";
import loading from "./loaderReducer";
import metaData from "./metadata";
import message from "./message";


const rootReducer = combineReducers({
    loading,
    metaData,
    message
});

export default rootReducer;

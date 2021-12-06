import { combineReducers } from "redux";
import createUser from './createUser';
import loading from "./loaderReducer";

const rootReducer = combineReducers({
    loading,
    createUser
});

export default rootReducer;
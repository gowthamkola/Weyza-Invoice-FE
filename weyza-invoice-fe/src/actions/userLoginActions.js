import * as ActionTypes from '../constants/ActionTypes';

import { dispatchAction } from './serviceActionUtil';
import {clear} from 'redux-localstorage-simple';


export const updateUserLogin = (payloadContent) => {
    return dispatchAction(ActionTypes.SAVE_LOGGED_IN_USER, payloadContent);
}

export const logUserOut = () =>{
    clear()
    return dispatchAction(ActionTypes.LOGOUT);
}

import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import * as ActionTypes from '../constants/ActionTypes';
import initState from './initState';
import metaState from './metaInit';
console.log(metaState)

export default function (state = initState.metaData, action) {
    switch (action.type) {
        case ActionTypes.SAVE_LOGGED_IN_USER: {
            const newState = Object.assign({}, state);
            newState.userLogged = true;
            newState.userName = action.payload.user.username;
            newState.name = action.payload.user.name;
            newState.token = action.payload.token;
            newState.role = action.payload.user.role
            console.log(newState, action.payload)
            return {
                ...state,
                ...newState
            }
        }
        case ActionTypes.LOGOUT : {
            const newState = Object.assign({}, state);
            newState.userLogged = false;
            newState.userName = '';
            newState.name = '';
            newState.token = '';
            newState.role = ''
            return {
                ...state,
                ...newState
            }
        }
        default: 
        return state;
    }
}
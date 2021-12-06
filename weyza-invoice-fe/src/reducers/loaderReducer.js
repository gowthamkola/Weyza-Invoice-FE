import * as ActionTypes from '../constants/ActionTypes';
import initState from './initState';

export default function (state = initState.loading, action) {
    switch (action.type) {
        case ActionTypes.SHOW_LOADER: {
            const newState = Object.assign({}, state);
            newState.isLoading = true;
            return {
                ...state,
                ...newState
            }
        }
        case ActionTypes.HIDE_LOADER: {
            const newState = Object.assign({}, state);
            newState.isLoading = false;
            return {
                ...state,
                ...newState
            }
        }
        default: 
        return state;
    }
}
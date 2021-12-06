import * as ActionTypes from '../constants/ActionTypes';

import { dispatchAction } from './serviceActionUtil';

export const showLoader = () => {
    return dispatchAction(ActionTypes.SHOW_LOADER);
}

export const hideLoader = () => {
    return dispatchAction(ActionTypes.HIDE_LOADER);
}
import * as ActionTypes from '../constants/ActionTypes';


// const getActionTypes = (type) => {

//     return {
//         _PENDING: type + '_PENDING',
//         SUCCESS: type + '_SUCCESS',
//         ERROR: type + '_ERROR'
//     };
// };

// const notifyDefaults = {
//     error: true,
//     success: false
// };

// export const createServiceAction = (type, serviceMethod, params, notifyOptions) => (dispatch, getState) => {

//     let notify = {
//         ...notifyDefaults,
//         ...notifyOptions
//     };

//     const metadata = {...getState().metadata};

//     dispatch({
//         type: getActionTypes(type)._PENDING,
//         params: params
//     });

//     serviceMethod.call(this, params).then((response) => {

//         dispatch({
//             type: getActionTypes(type).SUCCESS,
//             payload: response,
//             params: {
//                 ...params,
//                 metadata
//             }
//         });
//         if (notify.success) {
//             dispatch({
//                 type: ActionTypes.APP_SUCCESS,
//                 payload: type
//             });
//         }

//     }).catch(err => {

//         /*
//          * error = {status, message, code}
//          * status = 'WARNING', 'ERROR'
//          * code is optional
//          *
//          */
//         if (!err.stack) {
//             // ignore code errors
//             dispatch({
//                 type: getActionTypes(type).ERROR,
//                 payload: err,
//                 params: params
//             });

//             if (notify.error) {
//                 dispatch({
//                     type: ActionTypes.APP_ERROR,
//                     payload: {error: err, type: type}
//                 });
//             }
//         } else {
//             console.log(err.stack);
//         }
//     });
// };

export const dispatchAction = (type, payload) => dispatch => {
    dispatch({
        type,
        payload
    });
};
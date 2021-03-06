import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { save, load } from "redux-localstorage-simple"
//import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
//import { routerMiddleware } from 'react-router-redux';
//import rootReducer from 'reducers';
//export const history = createHistory();
// function configureStoreProd(rootReducer, initialState) {
//     //const reactRouterMiddleware = routerMiddleware(history);
//     const middlewares = [
//         // Add other middleware on this line...

//         // thunk middleware can also accept an extra argument to be passed to each thunk action
//         // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
//         thunk,
//         //reactRouterMiddleware
//     ];

//     return createStore(rootReducer, initialState, compose(
//         applyMiddleware(...middlewares)
//         )
//     );
// }

function configureStoreDev(rootReducer, initialState) {
    //const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
        // Add other middleware on this line...
        save({states:["metaData"], debounce: 500}),
        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
        //reactRouterMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, load({states:["metaData"], debounce: 500}), composeEnhancers(
        applyMiddleware(...middlewares),
        )
    );

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextReducer = require('../reducers').default; // eslint-disable-line global-require
    //         store.replaceReducer(nextReducer);
    //     });
    // }

    return store;
}

let env = process.env.NODE_ENV;

const configureStore = configureStoreDev;

export default configureStore;


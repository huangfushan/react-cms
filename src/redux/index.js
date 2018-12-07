/**
 * index
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import {createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ThunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';

const configureStore = (reducers) => {
  const middleware = [];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger({
      actionTransformer: (action) => {
        return typeof action === 'function' ? 'Async action:' + action.name : action;
      }
    }));
  }
  middleware.push(ThunkMiddleware);

  const store = createStore(reducers, compose(applyMiddleware(...middleware)));
  console.log(store.getState());
  return store;
};

export default configureStore(reducers);


// /**
//  * index
//  * @Author: huangfs
//  * @Date: 2018-11-12
//  * @Project: cms
//  */
//
// import {
//     applyMiddleware,
//     compose,
//     createStore
// } from 'redux';
// import { createLogger } from 'redux-logger';
// import ThunkMiddleware from 'redux-thunk';
// import reducers from './reducers';
//
// const configureStore = (reducers) => {
//     const middleware = [];
//     const enhancers = [];
//
//     if (process.env.NODE_ENV === 'development') {
//         middleware.push(createLogger({
//             actionTransformer: (action) => {
//                 return typeof action === 'function' ? 'Async action:' + action.name : action;
//             }
//         }));
//     }
//     middleware.push(ThunkMiddleware);
//
//     enhancers.push(applyMiddleware(...middleware));
//
//     const store = createStore(reducers, compose(...enhancers));
//
//     // if (Persistence.active) {
//     //     Persistence.persist(store);
//     // }
//     return store;
// };
// //
// // const create = (rootReducer) => {
// //     const store = configureStore(rootReducer);
// //
// //     if (module && module.hot) {
// //         module.hot.accept(() => {
// //             const nextRootReducer = require('./reducers').default;
// //             store.replaceReducer(nextRootReducer);
// //         });
// //     }
// //
// //     return store;
// // };
//
// export default configureStore(reducers);

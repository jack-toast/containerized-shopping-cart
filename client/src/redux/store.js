/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const middlewares = [thunk];

// const store = createStore(
//   rootReducer,
//   applyMiddleware(...middlewares),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

export default store;

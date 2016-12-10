import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from '../reducers/reducer';
// const middleware = applyMiddleware(promise(), thunk);
const middleware = applyMiddleware(promise(), thunk);
const store = createStore(reducer, middleware);

export default store;

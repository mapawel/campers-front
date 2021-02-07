import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import offerReducer from 'reducers/offerReducer';

const store = createStore(
  offerReducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store;

import { createStore, applyMiddleware, combineReducers  } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import offerReducer from 'reducers/offerReducer';
import authReducer from 'reducers/authReducer';

const store = createStore(
  combineReducers({
    offers: offerReducer,
    auth: authReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)))

export default store;

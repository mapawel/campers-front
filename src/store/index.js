import { createStore, applyMiddleware, combineReducers  } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import throttle from 'lodash/throttle'
import offerReducer from 'reducers/offerReducer';
import authReducer from 'reducers/authReducer';
import errorReducer from 'reducers/errorReducer';
import { loadState, saveState } from 'localStorage';
import isAuthenticated from 'middleware/isAuthenticated';

const persistedAuthState = loadState();

const store = createStore(
  combineReducers({
    error: errorReducer,
    offers: offerReducer,
    auth: authReducer,
  }),
  persistedAuthState,
  composeWithDevTools(applyMiddleware(thunk, isAuthenticated)))

  store.subscribe(() => {
    saveState(store.getState().auth);
  });

export default store;






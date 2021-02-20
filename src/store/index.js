import { createStore, applyMiddleware, combineReducers  } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import throttle from 'lodash/throttle'
import offerReducer from 'reducers/offerReducer';
import authReducer from 'reducers/authReducer';
import { loadState, saveState } from 'localStorage';

const persistedAuthState = loadState();

const store = createStore(
  combineReducers({
    offers: offerReducer,
    auth: authReducer,
  }),
  persistedAuthState,
  composeWithDevTools(applyMiddleware(thunk)))

  store.subscribe(() => {
    saveState(store.getState().auth);
  });

export default store;






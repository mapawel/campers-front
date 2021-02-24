import jwt from 'jsonwebtoken';
import { LOGOUT } from 'actions/authActions';
import { CLEAR_USERS_CAR } from 'actions/offerActions';

const isAuthenticated = (store) => (next) => (action) => {
  const oldState = store.getState()
  const tokenBeforeAction = oldState.auth.token
  const whenExpire = jwt.decode(tokenBeforeAction)?.exp
  if (Date.now() >= whenExpire * 1000) {
    next({type: LOGOUT});
    next({type: CLEAR_USERS_CAR});
  } else next(action);
}

export default isAuthenticated;
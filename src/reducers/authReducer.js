import { toast } from 'react-toastify';
import { SIGNUP_REQUESTED, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from 'actions/authActions'

const initialState = {
  userEmail: null,
  token: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUESTED:
      toast(payload)
      return state
    case SIGNUP_SUCCESS:
      toast.success(`Signed up user: ${payload}`)
      return state
    case SIGNUP_ERROR:
      toast.error('Error while signing up')
      return state


    case LOGIN_REQUESTED:
      toast(payload)
      return state
    case LOGIN_SUCCESS:
      toast.success('Logged in!')
      return {
        ...state,
        userEmail: payload.userEmail,
        token: payload.token,
      }
    case LOGIN_ERROR:
      toast.error('Error while logging in')
      return state


    case LOGOUT:
      toast.success('Logged out!')
      return {
        ...state,
        userEmail: null,
        token: null,
      }


    default:
      return state
  }
}

export default authReducer;
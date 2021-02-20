import { toast } from 'react-toastify';
import { SIGNUP_REQUESTED, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_ERROR } from 'actions/authActions'

const initialState = {
  userId: null,
  token: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUESTED:
      toast(payload)
      return state
    case SIGNUP_SUCCESS:
      toast.success('Signed up!')
      return {
        ...state,
        userId: payload,
      }
    case SIGNUP_ERROR:
      toast.error(
        `${payload.errorMessage}: ${payload.errorValidationErrors && payload.errorValidationErrors.map(err => ` ${err.msg}`)} ${payload.errorInfo && payload.errorInfo}`
        , { autoClose: 15000 })
      return state


    case LOGIN_REQUESTED:
      toast(payload)
      return state
    case LOGIN_SUCCESS:
      toast.success('Logged in!')
      return {
        ...state,
        userId: payload.userId,
        token: payload.token,
      }
    case LOGIN_ERROR:
      toast.error(
        `${payload.errorMessage} ${payload.errorValidationErrors ? payload.errorValidationErrors.map(err => ` ${err.msg}`) : ''} ${payload.errorInfo ? payload.errorInfo : ''}`
        , { autoClose: 15000 })
      return state




    default:
      return state
  }
}

export default authReducer;
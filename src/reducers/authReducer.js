import { toast } from 'react-toastify';
import { SIGNUP_REQUESTED, SIGNUP_SUCCESS, SIGNUP_ERROR } from 'actions/authActions'

const initialState = {
  user: null,
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
        user: payload,
      }
    case SIGNUP_ERROR:
      toast.error(payload)
      return state

      
    default:
      return state
  }
}

export default authReducer;
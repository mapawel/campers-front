import { RESET_ERROR } from 'actions/errorActions';

const initialState = {
  error: null
}

const errorReducer = (state = initialState, action) => {
  const { error } = action;
  if (error) {
    console.log('my ERROR Handler: ', error); // <<---------TO REMOVE
    return {
      ...state,
      error: {
        httpStatusCode: error.httpStatusCode,
        info: error.info,
        validationErrors: error.validationErrors,
      }
    }
  }
  if (action.type === RESET_ERROR) {
    return {
      ...state,
      error: null
    }
  }
  return state
}

export default errorReducer;
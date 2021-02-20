import axios from 'axios';
export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const signUpUser = (values) => (async (dispatch) => {
  try {
    dispatch({
      type: SIGNUP_REQUESTED,
      payload: 'Signing up a new user',
    })
    const fetchData = await axios({
      method: 'POST',
      url: `/api/auth/signup`,
      data: values,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: fetchData.data.userId
    })
    return fetchData
  } catch (err) {
    // console.log(err.toJSON())
    dispatch({
      type: SIGNUP_ERROR,
      payload: {
        errorMessage: err.response.data.message,
        errorValidationErrors: err.response.data.validationErrors,
        errorInfo: err.response.data.info
      }
    })
    return err
  }
})

export const logInUser = (values) => (async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUESTED,
      payload: 'Logging...',
    })
    const fetchData = await axios({
      method: 'POST',
      url: `/api/auth/login`,
      data: values,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: fetchData.data,
    })
    return fetchData
  } catch (err) {
    // console.log(err.toJSON())
    dispatch({
      type: LOGIN_ERROR,
      payload: {
        errorMessage: err.response.data.message,
        errorValidationErrors: err.response.data.validationErrors,
        errorInfo: err.response.data.info
      }
    })
    return err
  }
})
import axios from 'axios';
export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

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
    console.log('zwrot z serwera: ',fetchData)
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: fetchData.data.user._id
    })
    return fetchData
  } catch (err) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: err.message
    })
    return err
  }
})
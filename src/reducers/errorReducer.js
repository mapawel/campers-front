const initialState = {
  error: null
}

const errorReducer = (state = initialState, action) => {
  const { error } = action
  if (error?.data?.action === 'logout') {
    console.log('my ERROR Handler: ', error);
    return {
      ...state,
      error
    }
  }
  return state
}

export default errorReducer;
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
  cars: []
}

const offerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'START_FETCH':
      toast.success('Data fetched from db')
      return {
        ...state,
        cars: [...payload]
      }
    case 'START_FETCH_ERROR':
      toast.error(payload)
      return state
    case 'ADD_CAR':
      toast.success('Data updated')
      return {
        ...state,
        cars: [...state.cars, ...payload]
      }
    default:
      return state
  }
}

export default offerReducer;
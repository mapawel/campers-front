import { toast } from 'react-toastify';
import { ADD_CAR_REQUESTED, ADD_CAR_SUCCESS, ADD_CAR_ERROR, STARTFETCH_CAR_REQUESTED, STARTFETCH_CAR_SUCCESS, STARTFETCH_CAR_ERROR } from 'actions/offerActions'

const initialState = {
  cars: []
}

const offerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STARTFETCH_CAR_REQUESTED:
      toast(payload)
      return state
    case STARTFETCH_CAR_SUCCESS:
      toast.success('Data fetched from db')
      return {
        ...state,
        cars: [...payload]
      }
    case STARTFETCH_CAR_ERROR:
      toast.error(payload)
      return state


    case ADD_CAR_REQUESTED:
      toast(payload)
      return state
    case ADD_CAR_SUCCESS:
      toast.success('Data updated')
      return {
        ...state,
        cars: [...state.cars, ...payload]
      }
    case ADD_CAR_ERROR:
      toast.error(payload)
      return state

      
    default:
      return state
  }
}

export default offerReducer;
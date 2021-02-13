import { toast } from 'react-toastify';
import { ADD_CAR_REQUESTED, ADD_CAR_SUCCESS, ADD_CAR_ERROR, STARTFETCH_CAR_REQUESTED, STARTFETCH_CAR_SUCCESS, STARTFETCH_CAR_ERROR, FETCH_CARBYID_REQUESTED, FETCH_CARBYID_SUCCESS, FETCH_CARBYID_ERROR, UPDATE_CAR_REQUESTED, UPDATE_CAR_SUCCESS, UPDATE_CAR_ERROR, DELETE_CAR_REQUESTED, DELETE_CAR_SUCCES, DELETE_CAR_ERROR } from 'actions/offerActions'

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


    case FETCH_CARBYID_REQUESTED:
      toast(payload)
      return state
    case FETCH_CARBYID_SUCCESS:
      toast.success('Car data fetched from db')
      return {
        ...state,
        cars: [...state.cars, payload]
      }
    case FETCH_CARBYID_ERROR:
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


    case UPDATE_CAR_REQUESTED:
      toast(payload)
      return state
    case UPDATE_CAR_SUCCESS:
      toast.success('Data updated')
      return {
        ...state,
        cars: [...state.cars.map(car => {
          if (car._id === payload._id) return payload
          else return car
        })],
      }
    case UPDATE_CAR_ERROR:
      toast.error(payload)
      return state


    case DELETE_CAR_REQUESTED:
      toast(payload)
      return state
    case DELETE_CAR_SUCCES:
      toast.success('A car offer removed')
      return {
        ...state,
        cars: [...state.cars.filter(car => car._id !== payload._id)],
      }
    case DELETE_CAR_ERROR:
      toast.error(payload)
      return state

      
    default:
      return state
  }
}

export default offerReducer;
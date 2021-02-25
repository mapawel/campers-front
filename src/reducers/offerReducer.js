import { toast } from 'react-toastify';
import { ADD_CAR_REQUESTED, ADD_CAR_SUCCESS, ADD_CAR_ERROR, STARTFETCH_CAR_REQUESTED, STARTFETCH_CAR_SUCCESS, STARTFETCH_CAR_ERROR, RESTFETCH_CAR_REQUESTED, RESTFETCH_CAR_SUCCESS, RESTFETCH_CAR_ERROR, FETCH_CARBYID_REQUESTED, FETCH_CARBYID_SUCCESS, FETCH_CARBYID_ERROR, UPDATE_CAR_REQUESTED, UPDATE_CAR_SUCCESS, UPDATE_CAR_ERROR, DELETE_CAR_REQUESTED, DELETE_CAR_SUCCES, DELETE_CAR_ERROR, FETCH_USERS_CAR_REQUESTED, FETCH_USERS_CAR_SUCCESS, FETCH_USERS_CAR_ERROR, CLEAR_USERS_CAR } from 'actions/offerActions'

const initialState = {
  cars: [],
  usersCars: [],
  carsQty: 0,
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
        cars: [...payload.cars],
        carsQty: payload.carsQty
      }
    case STARTFETCH_CAR_ERROR:
      toast.error('Error while fetching data!')
      return state


    case FETCH_USERS_CAR_REQUESTED:
      toast(payload)
      return state
    case FETCH_USERS_CAR_SUCCESS:
      toast.success('User data fetched from db')
      return {
        ...state,
        usersCars: [...payload.usersCars],
      }
    case FETCH_USERS_CAR_ERROR:
      toast.error('Error while fetching user data!')
      return state


    case CLEAR_USERS_CAR:
      return {
        ...state,
        usersCars: [],
      }


    case RESTFETCH_CAR_REQUESTED:
      toast(payload)
      return state
    case RESTFETCH_CAR_SUCCESS:
      toast.success('Data fetched from db')
      return {
        ...state,
        cars: [...state.cars, ...payload.cars].sort((x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime()),
        carsQty: payload.carsQty
      }
    case RESTFETCH_CAR_ERROR:
      toast.error('Error while fetching rest data!')
      return state


    case FETCH_CARBYID_REQUESTED:
      toast(payload)
      return state
    case FETCH_CARBYID_SUCCESS:
      toast.success('Car data fetched from db')
      return {
        ...state,
        cars: [...state.cars, payload],
        redirect: null
      }
    case FETCH_CARBYID_ERROR:
      toast.error('Error while fetching choosen data!')
      return state


    case ADD_CAR_REQUESTED:
      toast(payload)
      return state
    case ADD_CAR_SUCCESS:
      toast.success('Data updated')
      return {
        ...state,
        cars: [...payload, ...state.cars]
      }
    case ADD_CAR_ERROR:
      // toast.error(
      //   `${payload.errorMessage}: ${payload.errorValidationErrors ? payload.errorValidationErrors?.map(err => ` ${err.msg}`) : '...'}`
      //   , { autoClose: 15000 })
      toast.error('Error while adding new data!')
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
      // toast.error(
      //   `${payload.errorMessage}: ${payload.errorValidationErrors ? payload.errorValidationErrors?.map(err => ` ${err.msg}`) : '...'}`
      //   , { autoClose: 15000 })
      toast.error('Error while updating data!')
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
      toast.error('Error while deleting data!')
      return state

    default:
      return state
  }
}

export default offerReducer;
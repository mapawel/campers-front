import axios from 'axios';
import moment from 'moment';
export const ADD_CAR_REQUESTED = 'ADD_CAR_REQUESTED';
export const ADD_CAR_SUCCESS = 'ADD_CAR_SUCCESS';
export const ADD_CAR_ERROR = 'ADD_CAR_ERROR';
export const DELETE_CAR_REQUESTED = 'DELETE_CAR_REQUESTED';
export const DELETE_CAR_SUCCES = 'DELETE_CAR_SUCCES';
export const DELETE_CAR_ERROR = 'DELETE_CAR_ERROR';
export const UPDATE_CAR_REQUESTED = 'UPDATE_CAR_REQUESTED';
export const UPDATE_CAR_SUCCESS = 'UPDATE_CAR_SUCCESS';
export const UPDATE_CAR_ERROR = 'UPDATE_CAR_ERROR';
export const STARTFETCH_CAR_REQUESTED = 'STARTFETCH_CAR_REQUESTED';
export const STARTFETCH_CAR_SUCCESS = 'STARTFETCH_CAR_SUCCESS';
export const STARTFETCH_CAR_ERROR = 'STARTFETCH_CAR_ERROR';
export const RESTFETCH_CAR_REQUESTED = 'RESTFETCH_CAR_REQUESTED';
export const RESTFETCH_CAR_SUCCESS = 'RESTFETCH_CAR_SUCCESS';
export const RESTFETCH_CAR_ERROR = 'RESTFETCH_CAR_ERROR';
export const FETCH_CARBYID_REQUESTED = 'FETCH_CARBYID_REQUESTED';
export const FETCH_CARBYID_SUCCESS = 'FETCH_CARBYID_SUCCESS';
export const FETCH_CARBYID_ERROR = 'FETCH_CARBYID_ERROR';

export const startFetchCars = (elements = 10) => (async (dispatch) => {
  try {
    dispatch({
      type: STARTFETCH_CAR_REQUESTED,
      payload: 'Fetching data...',
    })
    const fetchData = await axios.get(`/api/offer/cars?elements=${elements}`);
    dispatch({
      type: STARTFETCH_CAR_SUCCESS,
      payload: {
        cars: fetchData.data.carsRes.cars,
        carsQty: fetchData.data.carsRes.carsQty,
      }
    })
    return fetchData
  } catch (err) {
    dispatch({
      type: STARTFETCH_CAR_ERROR,
      payload: err.message
    })
    return err
  }
})

export const restFetchCars = (elements = 5, onlyNew) => (async (dispatch, getState) => {
  let offersDateArr = getState().cars.map(car => moment.utc(new Date(car.createdAt)).format('x')*1);
  if (!getState().cars.length) offersDateArr = [new Date().getTime()*1]
  const newest = Math.max(...offersDateArr)
  let oldest = Math.min(...offersDateArr)
  if (onlyNew) oldest = 0
  try {
    dispatch({
      type: RESTFETCH_CAR_REQUESTED,
      payload: 'Fetching rest data...',
    })
    const fetchData = await axios.get(`/api/offer/restcars?elements=${elements}&oldest=${oldest}&newest=${newest}`);
    dispatch({
      type: RESTFETCH_CAR_SUCCESS,
      payload: {
        cars: fetchData.data.carsRes.cars,
        carsQty: fetchData.data.carsRes.carsQty,
      }
    })
    return fetchData
  } catch (err) {
    dispatch({
      type: RESTFETCH_CAR_ERROR,
      payload: err.message
    })
    return err
  }
})

export const fetchCarById = (carId) => (async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CARBYID_REQUESTED,
      payload: 'Fetching car data...',
    })
    const fetchData = await axios.get(`/api/offer/car/${carId}`);
    dispatch({
      type: FETCH_CARBYID_SUCCESS,
      payload: fetchData.data.car
    })
  } catch (err) {
    dispatch({
      type: FETCH_CARBYID_ERROR,
      payload: err.message
    })
  }
})

export const DeleteCarById = (carId) => (async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CAR_REQUESTED,
      payload: 'Deleting car data...',
    })
    const response = await axios({
      method: 'DELETE',
      url: `/api/offer/car/${carId}`,
    })
    dispatch({
      type: DELETE_CAR_SUCCES,
      payload: response.data.deletedCar
    })
  } catch (err) {
    dispatch({
      type: DELETE_CAR_ERROR,
      payload: err.message
    })
  }
})


export const addOrUpdateCar = (car) => (async (dispatch) => {
  const formData = new FormData();
  const { id, name, year, seats, length, description, imagesObjs, currendImagesUrls, updating } = car;
  formData.append('name', name);
  formData.append('year', year);
  formData.append('length', length);
  formData.append('seats', seats);
  formData.append('description', description);
  imagesObjs.forEach(img => formData.append('images', img.file))
  if (updating) {
    if (currendImagesUrls.length) formData.append('currendImagesUrls', currendImagesUrls);
    try {
      dispatch({
        type: UPDATE_CAR_REQUESTED,
        payload: 'Updating requested data...',
      })
      const response = await axios({
        method: 'PUT',
        url: `/api/offer/car/${id}`,
        data: formData,
      })
      dispatch({
        type: UPDATE_CAR_SUCCESS,
        payload: response.data.updatedCar
      })
      return response
    } catch (err) {
      dispatch({
        type: UPDATE_CAR_ERROR,
        payload: err.message
      })
      return err
    }
  } else {
    try {
      dispatch({
        type: ADD_CAR_REQUESTED,
        payload: 'Updating data...',
      })
      const response = await axios({
        method: 'POST',
        url: '/api/offer/car',
        data: formData,
      })
      dispatch({
        type: ADD_CAR_SUCCESS,
        payload: [response.data.car]
      })
      return response
    } catch (err) {
      dispatch({
        type: ADD_CAR_ERROR,
        payload: err.message
      })
      return err
    }
  }
})

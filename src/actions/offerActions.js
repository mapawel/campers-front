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
export const FETCH_USERS_CAR_REQUESTED = 'FETCH_USERS_CAR_REQUESTED';
export const FETCH_USERS_CAR_SUCCESS = 'FETCH_USERS_CAR_SUCCESS';
export const FETCH_USERS_CAR_ERROR = 'FETCH_USERS_CAR_ERROR';
export const CLEAR_USERS_CAR = 'CLEAR_USERS_CAR';
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
    const fetchData = await axios({
      url: `/api/offer/cars?elements=${elements}`,
      method: 'GET',
    });
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
      error: err.response?.data,
    })
    return err
  }
})

export const fetchUsersCars = () => (async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USERS_CAR_REQUESTED,
      payload: 'Fetching users data...',
    })
    const fetchData = await axios({
      url: `/api/offer/userscars`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getState().auth.token}`
      },
    });
    dispatch({
      type: FETCH_USERS_CAR_SUCCESS,
      payload: {
        usersCars: fetchData.data.carsRes.usersCars,
      },
    })
    return fetchData
  } catch (err) {
    dispatch({
      type: FETCH_USERS_CAR_ERROR,
      error: err.response?.data,
    })
    return err
  }
})

export const clearUsersCars = () => ((dispatch, getState) => {
  dispatch({
    type: CLEAR_USERS_CAR,
  })
})

export const restFetchCars = (elements = 5, onlyNew) => (async (dispatch, getState) => {
  let offersDateArr = getState().offers.cars.map(car => moment.utc(new Date(car.createdAt)).format('x') * 1);
  if (!getState().offers.cars.length) offersDateArr = [new Date().getTime() * 1]
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
      error: err.response?.data,
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
      error: err.response?.data,
    })
  }
})

export const DeleteCarById = (carId) => (async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_CAR_REQUESTED,
      payload: 'Deleting car data...',
    })
    const response = await axios({
      method: 'DELETE',
      url: `/api/offer/car/${carId}`,
      headers: {
        Authorization: `Bearer ${getState().auth.token}`
      },
    })
    dispatch({
      type: DELETE_CAR_SUCCES,
      payload: response.data.toDelete
    })
  } catch (err) {
    dispatch({
      type: DELETE_CAR_ERROR,
      error: err.response?.data,
    })
  }
})


export const addOrUpdateCar = (car) => (async (dispatch, getState) => {
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
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        },
      })
      dispatch({
        type: UPDATE_CAR_SUCCESS,
        payload: response.data.updatedCar
      })
      return response
    } catch (err) {
      dispatch({
        type: UPDATE_CAR_ERROR,
        error: err.response?.data,
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
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        },
      })
      dispatch({
        type: ADD_CAR_SUCCESS,
        payload: [response.data.car]
      })
      return response
    } catch (err) {
      dispatch({
        type: ADD_CAR_ERROR,
        error: err.response?.data,
      })
      return err
    }
  }
})

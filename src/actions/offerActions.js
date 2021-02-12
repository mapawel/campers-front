import axios from 'axios';
export const ADD_CAR_REQUESTED = 'ADD_CAR_REQUESTED';
export const ADD_CAR_SUCCESS = 'ADD_CAR_SUCCESS';
export const ADD_CAR_ERROR = 'ADD_CAR_ERROR';
export const UPDATE_CAR_REQUESTED = 'UPDATE_CAR_REQUESTED';
export const UPDATE_CAR_SUCCESS = 'UPDATE_CAR_SUCCESS';
export const UPDATE_CAR_ERROR = 'UPDATE_CAR_ERROR';
export const STARTFETCH_CAR_REQUESTED = 'STARTFETCH_CAR_REQUESTED';
export const STARTFETCH_CAR_SUCCESS = 'STARTFETCH_CAR_SUCCESS';
export const STARTFETCH_CAR_ERROR = 'STARTFETCH_CAR_ERROR';
export const FETCH_CARBYID_REQUESTED = 'FETCH_CARBYID_REQUESTED';
export const FETCH_CARBYID_SUCCESS = 'FETCH_CARBYID_SUCCESS';
export const FETCH_CARBYID_ERROR = 'FETCH_CARBYID_ERROR';

export const startFetchCars = () => (async (dispatch) => {
  try {
    dispatch({
      type: STARTFETCH_CAR_REQUESTED,
      payload: 'Fetching data...',
    })
    const fetchData = await axios.get('/api/offer/cars');
    if (fetchData.status === 200) {
      dispatch({
        type: STARTFETCH_CAR_SUCCESS,
        payload: fetchData.data.cars
      })
    }
  } catch (err) {
    dispatch({
      type: STARTFETCH_CAR_ERROR,
      payload: err.message
    })
  }
})

export const fetchCarById = (carId) => (async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CARBYID_REQUESTED,
      payload: 'Fetching car data...',
    })
    const fetchData = await axios.get(`/api/offer/car/${carId}`);
    if (fetchData.status === 200) {
      dispatch({
        type: FETCH_CARBYID_SUCCESS,
        payload: fetchData.data.car
      })
    }
  } catch (err) {
    dispatch({
      type: FETCH_CARBYID_ERROR,
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
    formData.append('id', id);
    formData.append('currendImagesUrls', currendImagesUrls);
    console.log(car)
    try {
      dispatch({
        type: UPDATE_CAR_REQUESTED,
        payload: 'Updating requestes data...',
      })
      const response = await axios({
        method: 'PUT',
        url: `/api/offer/car/${id}`,
        data: formData,
      })
      dispatch({
        type: UPDATE_CAR_SUCCESS,
        payload: [response.data.car]
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

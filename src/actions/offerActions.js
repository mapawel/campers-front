import axios from 'axios';
export const ADD_CAR_REQUESTED = 'ADD_CAR_REQUESTED';
export const ADD_CAR_SUCCESS = 'ADD_CAR_SUCCESS';
export const ADD_CAR_ERROR = 'ADD_CAR_ERROR';
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


export const addCar = (car) => (async (dispatch) => {
  const formData = new FormData();
  const { name, year, seats, length, description, images } = car;
  formData.append('name', name);
  formData.append('year', year);
  formData.append('length', length);
  formData.append('seats', seats);
  formData.append('description', description);
  Object.keys(images).forEach(img => formData.append('images', images[img]))

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
    console.log(response)
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
})

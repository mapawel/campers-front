import axios from 'axios';
export const ADD_CAR_REQUESTED = 'ADD_CAR_REQUESTED';
export const ADD_CAR_SUCCESS = 'ADD_CAR_SUCCESS';
export const ADD_CAR_ERROR = 'ADD_CAR_ERROR';
export const STARTFETCH_CAR_REQUESTED = 'STARTFETCH_CAR_REQUESTED';
export const STARTFETCH_CAR_SUCCESS = 'STARTFETCH_CAR_SUCCESS';
export const STARTFETCH_CAR_ERROR = 'STARTFETCH_CAR_ERROR';

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


export const addCar = (car) => (async (dispatch) => {
  try {
    dispatch({
      type: ADD_CAR_REQUESTED,
      payload: 'Updating data...',
    })
    const { name, year, seats, length, description, images } = car
    console.log(images)
    const response = await axios({
      method: 'POST',
      url: '/api/offer/car',
      headerd: 'Content-Type: "application/json"',
      data: {
        name,
        year,
        length,
        seats,
        description,
        images,
      }
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

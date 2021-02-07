import axios from 'axios';


export const startFetchCars = () => (async (dispatch, getState) => {
  try {
    const fetchData = await axios.get('/api/offer/cars');
    if (fetchData.status === 200) {
      return dispatch({
        type: 'START_FETCH',
        payload: fetchData.data.cars
      })
    }
  } catch (err) {
    return dispatch({
      type: 'START_FETCH_ERROR',
      payload: err.message
    })
  }
})

export const addCar = (car) => (async (dispatch, getState) => {
  const { name, year, seats, length, description } = car
  const response = await axios({
    method: 'POST',
    url: '/api/offer/car',
    headerd: 'Content-Type: "application/json"',
    data: {
      name,
      year,
      length,
      seats,
      description
    }
  })

  return dispatch({
    type: 'ADD_CAR',
    payload: [car]
  })

})

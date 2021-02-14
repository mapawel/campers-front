import React, { useState, useEffect } from 'react';
import moment from 'moment';
import debounce from 'lodash/debounce';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { startFetchCars, restFetchCars } from 'actions/offerActions'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CircularProgress } from '@material-ui/core';
import CarCard from 'components/molecules/CarCard'

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '3rem 0',
  },
  link: {
    textDecoration: 'none',
  },
  circularProgress: {
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


const CarCards = ({ cars, carsQty, startFetch, restFetch, context }) => {
  const classes = useStyles();
  const [screenYpossition, setScreenYpossition] = useState()
  const [clientHeight, setClientHeight] = useState()
  const [documentHeight, setDocumentHeight] = useState()
  const [canFetch, setCanFetch] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const fetch = async (elements) => {
    setCanFetch(false)
    setIsFetching(true)
    const done = await startFetch(elements)
    setCanFetch(true)
    setIsFetching(false)
  }

  const fetchRest = async (elements, onlynew) => {
    setCanFetch(false)
    setIsFetching(true)
    const done = await restFetch(elements, onlynew)
    setCanFetch(true)
    setIsFetching(false)
  }

  useEffect(() => {
    if (canFetch) {
      if (!cars.length) fetch(5)
      else fetchRest(5, true)
    }
  }, [])

  useEffect(() => {
    const checkScreenParams = () => {
      let docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      setScreenYpossition(window.pageYOffset)
      setClientHeight(document.documentElement.clientHeight)
      setDocumentHeight(docHeight)
    }

    window.addEventListener('scroll', debounce(checkScreenParams, 200))
    window.addEventListener('resize', debounce(checkScreenParams, 500))
    checkScreenParams()
  }, [cars])

  useEffect(() => {
    if (carsQty - cars.length <= 0 && carsQty !== 0) {
      setCanFetch(false)
    }
  }, [cars, carsQty])

  useEffect(() => {
    if (canFetch) {
      const whenDownloadMargin = 200;
      if (documentHeight - clientHeight - screenYpossition <= whenDownloadMargin) {
        fetchRest(5)
      }
    }
  }, [screenYpossition, clientHeight, documentHeight, canFetch])


  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.grid}
      >
        <>
          {cars.map(({
            _id,
            name,
            year,
            length,
            seats,
            description,
            imagesUrls,
            createdAt,
          }) =>
            <Grid
              item
              key={_id}
              id={_id}>
              <Link to={`/${_id}`} className={classes.link}>
                <CarCard
                  id={_id}
                  name={name}
                  year={year}
                  length={length}
                  seats={seats}
                  description={description}
                  imagesUrls={imagesUrls}
                  createdAt={createdAt}
                />
              </Link>
            </Grid>
          )
          }
        </>
      </Grid>
      {isFetching &&
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      }
    </>
  )
};


Card.propTypes = {

};

const mapStateToProps = (state) => ({
  cars: state.cars,
  carsQty: state.carsQty,
})
const mapDispatchToProps = (disatch) => ({
  startFetch: async (elements) => await disatch(startFetchCars(elements)),
  restFetch: async (elements, onlyNew) => await disatch(restFetchCars(elements, onlyNew))
})
export default connect(mapStateToProps, mapDispatchToProps)(withContext(CarCards));

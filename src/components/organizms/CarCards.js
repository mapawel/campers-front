import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { startFetchCars } from 'actions/offerActions'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import CarCard from 'components/molecules/CarCard'

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '3rem 0',
  },
  link: {
    textDecoration: 'none',
  }
}));


const CarCards = ({ cars, carsQty, fetchAll, context }) => {
  const { alredyShowed, setAlredyShowed, pageToShow, setPageToShow } = context;
  const classes = useStyles();
  const [screenYpossition, setScreenYpossition] = useState()
  const [clientHeight, setClientHeight] = useState()
  const [documentHeight, setDocumentHeight] = useState()
  const [canFetch, setCanFetch] = useState(true)

  useEffect(() => {

    console.log('TEST')

    const fetch = async () => {
      setCanFetch(false)
      const done = await fetchAll(pageToShow)
      setCanFetch(true)
      setAlredyShowed(pageToShow)
    }
    if (pageToShow !== alredyShowed) fetch()
  }, [pageToShow])

  useEffect(() => {
    if (carsQty - cars.length <= 0 && carsQty !== 0) {
      setCanFetch(false)
    }
  }, [cars, carsQty, pageToShow])

  useEffect(() => {
    if (canFetch) {
      const whenDownloadMargin = 0;
      if (documentHeight - clientHeight - screenYpossition <= whenDownloadMargin) {
        setPageToShow(pageToShow + 1)
      }
    }
  }, [screenYpossition, clientHeight, documentHeight, canFetch])

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

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      className={classes.grid}
    >
      <>
        {console.log('screenYpossition', screenYpossition)}
        {console.log('clientHeight', clientHeight)}
        {console.log('documentHeight', documentHeight)}
        {console.log('carsQty', carsQty)}
        {cars.map(({
          _id,
          name,
          year,
          length,
          seats,
          description,
          imagesUrls,
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
              />
            </Link>
          </Grid>
        )
        }
      </>
    </Grid >
  )
};


Card.propTypes = {

};

const mapStateToProps = (state) => ({
  cars: state.cars,
  carsQty: state.carsQty,
})
const mapDispatchToProps = (disatch) => ({
  fetchAll: async (page) => await disatch(startFetchCars(page))
})
export default connect(mapStateToProps, mapDispatchToProps)(withContext(CarCards));

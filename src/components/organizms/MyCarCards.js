import React, { useState, useEffect } from 'react';
import moment from 'moment';
import debounce from 'lodash/debounce';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { fetchUsersCars } from 'actions/offerActions'
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


const MyCarCards = ({ cars, usersCars, fetchByUser }) => {
  const classes = useStyles();
  const [isFetching, setIsFetching] = useState(true);


  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true)
      const done = await fetchByUser()
      setIsFetching(false)
    }
    fetch()
  }, [cars])

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
          {usersCars.map(({
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
                  userkeys={1}
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
  cars: state.offers.cars,
  usersCars: state.offers.usersCars,
})
const mapDispatchToProps = (disatch) => ({
  fetchByUser: async () => await disatch(fetchUsersCars()),
})
export default connect(mapStateToProps, mapDispatchToProps)(withContext(MyCarCards));

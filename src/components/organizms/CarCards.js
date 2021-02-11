import React, { useEffect } from 'react';
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


const CarCards = ({ cars, fetchAll }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchAll()
  }, [])

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

const mapStateToProps = (state) => ({ cars: state.cars })
const mapDispatchToProps = (disatch) => ({
  fetchAll: () => disatch(startFetchCars())
})
export default connect(mapStateToProps, mapDispatchToProps)(CarCards);

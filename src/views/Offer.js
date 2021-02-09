import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.light,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
  grid: {
    padding: '3rem 0',
  }
}));


const Offer = ({offer}) => {
  const [{ _id, name, year, length, seats, description }] = offer;
  console.log(offer)
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
 
    <Card id={_id} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull} from {year}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull} length: {length}
        </Typography>
        <Typography variant="h5" component="h2">
          {bull} seats: {seats}
        </Typography>
        <Typography className={classes.pos} color="textPrimary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">details</Button>
      </CardActions>
    </Card>
  );
};


Offer.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { offerId } } } = ownProps
  return({
  offer: state.cars.filter(car => car._id === offerId)
})}

export default connect(mapStateToProps)(Offer);

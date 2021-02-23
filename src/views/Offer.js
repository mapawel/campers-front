import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCarById } from 'actions/offerActions'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, GridList, GridListTile } from '@material-ui/core';
import Section from 'templates/Section'

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
  },
  galleryBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    // height: 450,
  },
}));


const Offer = ({ offer, FetchByIdFb, match: { params: { offerId }} }) => {

  useEffect(() => {
    FetchByIdFb()
  }, [offerId])

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Section>
      <div className={classes.galleryBox} >
        <GridList cellHeight={360} className={classes.gridList} cols={3}>
          {offer.length && offer[0].imagesUrls.map((img, index) => (
            <GridListTile key={img} cols={1}>
              <img src={img} alt={`Imager for: ${offer.length && offer[0].name}, nr: ${index + 1}`} />
            </GridListTile>
          ))}
        </GridList>
      </div >
      <Card id={offer.length && offer[0]._id} className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {offer.length && offer[0].name}
          </Typography>
          <Typography variant="h5" component="h2">
            {bull} from {offer.length && offer[0].year}
          </Typography>
          <Typography variant="h5" component="h2">
            {bull} length: {offer.length && offer[0].length}
          </Typography>
          <Typography variant="h5" component="h2">
            {bull} seats: {offer.length && offer[0].seats}
          </Typography>
          <Typography className={classes.pos} color="textPrimary">
            {offer.length && offer[0].description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">details</Button>
        </CardActions>
      </Card>
    </Section >

  );
};


Offer.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { offerId } } } = ownProps
  return ({
    offer: state.offers.cars.filter(car => car._id === offerId),
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { match: { params: { offerId } } } = ownProps
  return ({
    FetchByIdFb: () => dispatch(fetchCarById(offerId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);

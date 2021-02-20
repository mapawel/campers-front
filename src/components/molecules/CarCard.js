import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DeleteCarById } from 'actions/offerActions';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, CardActionArea, CardMedia } from '@material-ui/core';

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
  media: {
    height: 140,
  },
}));

const CarCard = ({ context, id, name, year, length, seats, description, imagesUrls, createdAt, deleteFn, userkeys }) => {
  const { setEditedOfferValues, setAddingOpen } = context;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleEditClick = (e) => {
    e.preventDefault();
    setAddingOpen(true);
    setEditedOfferValues({
      id,
      name,
      year,
      length,
      seats,
      description,
      imagesUrls,
    })
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteFn(id)
  }



  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.media}
        image={imagesUrls[0]}
        src={imagesUrls[0]}
        title={`Image for: ${name}`}
        component="div"
      />
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {createdAt}
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
      {userkeys &&
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={(e) => { handleEditClick(e) }}
          >edit</Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={(e) => { handleDeleteClick(e) }}
          >delete</Button>
        </CardActions>
      }
    </Card>
  );
};


CarCard.propTypes = {

};

const mapDispatchToProps = dispatch => ({
  deleteFn: (carId) => dispatch(DeleteCarById(carId))
})

export default connect(null, mapDispatchToProps)(withContext(CarCard));

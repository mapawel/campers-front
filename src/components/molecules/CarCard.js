import React from 'react';
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

const CarCard = ({ name, year, length, seats, description, imagesUrls }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imagesUrls[0]}
          title={`Image for: ${name}`}
        />
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
      </CardActionArea>
    </Card>
  );
};


CarCard.propTypes = {

};


export default CarCard;

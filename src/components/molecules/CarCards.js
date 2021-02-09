import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { startFetchCars } from 'actions/offerActions'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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


const CarCards = ({ cars, fetchAll }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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
          description }) =>
          <Grid
            item
            key={_id}
            id={_id}>
            <Link to={`/${_id}`}>
              <Card className={classes.root} variant="outlined">
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

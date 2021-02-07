import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCar } from 'actions/offerActions';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const AddModalBody = ({ close, addFn }) => {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [seats, setSeats] = useState('')
  const [length, setLength] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = async () => {
    try {
      addFn({ name, year, seats, length, description })

      // const response = await axios({
      //   method: 'POST',
      //   url: '/api/offer/car',
      //   headerd: 'Content-Type: "application/json"',
      //   data: {
      //     name,
      //     description,
      //   }
      // }


      setName('')
      setYear('')
      setSeats('')
      setLength('')
      setDescription('')
      close()

    } catch (err) {
      throw new Error('My ERROR: ', err)
    }
  }



  return (
    <div className={classes.paper}>
      <Typography variant="h4">Add an offer</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="name"
          fullWidth
        />
        <TextField
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          label="year"
          fullWidth
        />
        <TextField
          id="length"
          name="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          label="length"
          fullWidth
        />
        <TextField
          id="seats"
          name="seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          label="seats"
          fullWidth
        />
        <TextField
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="description"
          type="textarea"
          fullWidth
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClick}
        >ADD</Button>
      </form>
    </div>
  )
}

AddModalBody.propTypes = {

}

const mapDispatchToProps = (dispatch) => ({
  addFn: ({ name, year, seats, length, description }) => dispatch(addCar({
    name,
    year,
    seats,
    length,
    description,
  }))
})

export default connect(null, mapDispatchToProps)(AddModalBody);


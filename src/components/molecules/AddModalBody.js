import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addCar } from 'actions/offerActions';
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

const validationSchema = yup.object({
  name: yup
    .string('Enter offers title')
    .required('Title is required')
    .min(2, 'Minimum 2 characters length'),
  year: yup
    .string('Enter cars production year')
    .min(4, 'Minimum 4 characters length')
    .required('Year is required'),
});

const AddModalBody = ({ close, addFn }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: '',
      year: '',
      seats: '',
      length: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const test = await addFn(values);
      close()
    },
  });


  return (
    <div className={classes.paper}>
      <Typography variant="h4">Add an offer</Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          label="name"
          fullWidth
        />

        <TextField
          id="year"
          name="year"
          value={formik.values.year}
          onChange={formik.handleChange}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}
          label="year"
          fullWidth
        />

        <TextField
          id="length"
          name="length"
          value={formik.values.length}
          onChange={formik.handleChange}
          error={formik.touched.length && Boolean(formik.errors.length)}
          helperText={formik.touched.length && formik.errors.length}
          label="length"
          fullWidth
        />
        <TextField
          id="seats"
          name="seats"
          value={formik.values.seats}
          onChange={formik.handleChange}
          error={formik.touched.seats && Boolean(formik.errors.seats)}
          helperText={formik.touched.seats && formik.errors.seats}
          label="seats"
          fullWidth
        />
        <TextField
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          label="description"
          type="textarea"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={formik.isSubmitting}
        >ADD</Button>
      </form>
    </div>
  )
}

AddModalBody.propTypes = {

}

const mapDispatchToProps = (dispatch) => ({
  addFn: async (values) => await dispatch(addCar(values))
})

export default connect(null, mapDispatchToProps)(AddModalBody);


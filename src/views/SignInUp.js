import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Section from 'templates/Section';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import routes from 'routes';
import { signUpUser } from 'actions/authActions';
import { logInUser } from 'actions/authActions';

const useStyles = makeStyles((theme) => ({
  box: {
    minHeight: '60vh',
  },
  input: {
    marginBottom: '2rem',
  },
  inputBox: {
    minWidth: 300,
    width: '50%',
  },
  form: {
    padding: '6rem',
  },
  link: {
    padding: '1rem 2rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  heading: {
    marginBottom: '4rem'
  },
}))


const signInValidation = {
  email: yup
    .string()
    .email('Enter valid e-mail address')
    .required('Field is required'),
  password: yup
    .string()
    .min(4, 'Minimum 4 characters length')
    .required('field is required'),
};

const plusSignUpValidation = {
  confirmpass: yup
    .string()
    .min(4, 'Minimum 4 characters length')
    .required('field is required'),
};

const SignInUp = ({ match, signUpFn, logInFn, history }) => {
  let signup = false;
  let login = false;
  if (match.path === routes.signup) signup = true;
  else if (match.path === routes.login) login = true;

  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmpass: '',
    },
    validationSchema: signup ? yup.object({ ...signInValidation, ...plusSignUpValidation }) : yup.object({ ...signInValidation }),
    onSubmit: async (values, { resetForm }) => {
      let response
      if (signup) {
        response = await signUpFn(values)
      }
      if (login) {
        response = await logInFn(values)
      }
      if (response.status === 201) {
        resetForm();
        history.push(routes.home)
      }

    },
  });


  return (
    <Section>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.box}>
        <Paper
          elevation={0}
          className={classes.inputBox}>
          <form
            className={classes.form}
            display="flex"
            flexdirection="column"
            justifycontent="center"
            alignitems="center"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Typography
              className={classes.heading}
              variant="h4"
              align="center"
            >
              {signup && 'Sign up for a new account:'}
              {login && 'Log in to my account:'}
            </Typography>
            <TextField
              className={classes.input}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="E-Mail"
              variant="outlined"
              fullWidth
            />
            <TextField
              className={classes.input}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
            {signup &&
              <TextField
                className={classes.input}
                id="confirmpass"
                name="confirmpass"
                value={formik.values.confirmpass}
                onChange={formik.handleChange}
                error={formik.touched.confirmpass && Boolean(formik.errors.confirmpass)}
                helperText={formik.touched.confirmpass && formik.errors.confirmpass}
                label="Confirm password"
                variant="outlined"
                type="password"
                fullWidth
              />
            }
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formik.isSubmitting}
              fullWidth
            >
              {signup && 'Sign up'}
              {login && 'Log in'}
            </Button>
            {signup && <Link className={classes.link} to={routes.login}>I have an accout, I want to log in ...</Link>}
            {login && <Link className={classes.link} to={routes.signup}>I need to sign up ...</Link>}
          </form>
        </Paper>
      </Box >
    </Section >
  )
}

SignInUp.propTypes = {

}

const mapDispatchToProps = dispatch => ({
  signUpFn: async (values) => await dispatch(signUpUser(values)),
  logInFn: async (values) => await dispatch(logInUser(values)),
})


export default connect(null, mapDispatchToProps)(SignInUp);


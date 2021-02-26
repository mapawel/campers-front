import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  alertWrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    maxWidth: 500,
    padding: '3rem',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  paragraph: {
    margin: '1.5rem 0',
  },
  lastParagraph: {
    marginTop: '3rem',
    textAlign: 'center',
  }
}))


const AlertWindow = React.forwardRef(({ appError, handleModalClose }, ref) => {
  const classes = useStyles();
  const { httpStatusCode, info, validationErrors } = appError

  return (
    <div
      ref={ref}
      className={classes.alertWrapper}
      tabIndex={-1}
      onClick={handleModalClose}>
      <Alert className={classes.alert} severity="error">
        <AlertTitle>
          <Typography variant='h5' className={classes.title}>Error</Typography>
        </AlertTitle>
        {info && <Typography className={classes.paragraph} variant='h6'><strong>{info}</strong></Typography>}
        {validationErrors && <Typography className={classes.paragraph} variant='h5'>Validation error! Details:<br/> {validationErrors.map((er, index) => (
        <div key={er.msg + index}><strong>{er.msg}</strong><br/></div>
        ))}
        </Typography>}
        <Typography className={classes.paragraph} variant='h6'>HTTP status code: <strong>{httpStatusCode}</strong></Typography>
        <Typography
          className={classes.lastParagraph}
          variant='subtitle2'
        >click anywere to continue
        </Typography>
      </Alert>
    </div>
  )
}
)

AlertWindow.propTypes = {

}

export default AlertWindow


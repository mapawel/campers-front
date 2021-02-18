import React from 'react';
import AppContext from 'context';
import PropTypes from 'prop-types';


const withContext = (Component) => (
  React.forwardRef((props, ref) => (
    <AppContext.Consumer>
      {(context) => (
        <>
          <Component context={context} {...props} ref={ref} />
        </>
      )}

    </AppContext.Consumer >
  )

  ))



withContext.propTypes = {

};


export default withContext;

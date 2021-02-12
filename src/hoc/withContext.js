import React from 'react';
import AppContext from 'context';
import PropTypes from 'prop-types';


const withContext = (Component) => (
  (props) => (
    <AppContext.Consumer>
      {(context) => (
        <>
          <Component context={context} {...props} />
        </>
      )}

    </AppContext.Consumer >
  )

)



withContext.propTypes = {

};


export default withContext;

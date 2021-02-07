import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from 'store';
import { ThemeProvider } from '@material-ui/styles';
import muiTheme from 'themes/muiTheme';
import GlobalStyle from 'themes/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RootTemplate = ({ children }) => {
  return (
    <Provider store={store} >
      <ThemeProvider theme={muiTheme} >
        <GlobalStyle />
        {children}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
};


RootTemplate.propTypes = {

};


export default RootTemplate;

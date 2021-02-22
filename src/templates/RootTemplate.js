import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import muiTheme from 'themes/muiTheme';
import GlobalStyle from 'themes/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'templates/toastify.css';


const RootTemplate = ({ children }) => {
  return (
    <ThemeProvider theme={muiTheme} >
      <GlobalStyle />
      {children}
      <ToastContainer
        autoClose={2000}
      />
    </ThemeProvider>
  );
};


RootTemplate.propTypes = {

};


export default RootTemplate;

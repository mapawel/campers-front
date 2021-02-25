import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import muiTheme from 'themes/muiTheme';
import GlobalStyle from 'themes/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'templates/toastify.css';
import Modal from '@material-ui/core/Modal';

const RootTemplate = ({ children, appError, resetErrorFn }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (appError) {
      setModalOpen(true)
    }

  }, [appError])

  const handleModalClose = () => {
    setModalOpen(false);
    resetErrorFn()
  };

  return (
    <ThemeProvider theme={muiTheme} >
      <GlobalStyle />
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="error-modal"
      >
        <></>
      </Modal>
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

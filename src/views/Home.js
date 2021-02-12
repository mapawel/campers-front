import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Section from 'templates/Section';
import CarCards from 'components/organizms/CarCards';
import AddModalBody from 'components/molecules/AddModalBody';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


const Home = ({context}) => {
  const { setEditedOfferValues, isAddingOpen, setAddingOpen } = context;
  const classes = useStyles();

  const handleModalOpenClick = () => {
    setEditedOfferValues(null)
    setAddingOpen(true)
  }

  return (
    <Section>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleModalOpenClick}
      >add a new car</Button>
      <CarCards />
      <Modal
        open={isAddingOpen}
        onClose={() => setAddingOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <AddModalBody />
      </Modal>
    </Section>
  );
};


Home.propTypes = {

};


export default withContext(Home);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import { Fab, Modal, DialogContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 9,
  },
}));


const Home = ({ context }) => {
  const { setEditedOfferValues, isAddingOpen, setAddingOpen } = context;
  const classes = useStyles();
  const ref = React.createRef();

  const handleModalOpenClick = () => {
    setEditedOfferValues(null)
    setAddingOpen(true)
  }

  return (
    <Section>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleModalOpenClick}>
        <AddIcon />
      </Fab>
      <CarCards />
      <Modal
        open={isAddingOpen}
        onClose={() => setAddingOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <AddModalBody ref={ref} />
      </Modal>
    </Section>
  );
};


Home.propTypes = {

};


export default withContext(Home);

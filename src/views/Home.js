import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Section from 'templates/Section';
import CarCards from 'components/molecules/CarCards';
import AddModalBody from 'components/molecules/AddModalBody';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


const Home = () => {
  const [isAddingOpen, setAddingOpen] = useState(false)
  const classes = useStyles();

  return (
    <Section>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => setAddingOpen(true)}
      >add a new car</Button>
      <CarCards />
      <Modal
        open={isAddingOpen}
        onClose={() => setAddingOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <AddModalBody close={() => setAddingOpen(false)} />
      </Modal>
    </Section>
  );
};


Home.propTypes = {

};


export default Home;

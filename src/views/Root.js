import React, { useState } from 'react'
import AppContext from 'context';
import RootTemplate from 'templates/RootTemplate';
import Home from 'views/Home';
import Offer from 'views/Offer';
import Navbar from 'components/organizms/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const Root = () => {
  const [isAddingOpen, setAddingOpen] = useState(false)
  const [editedOfferValues, setEditedOfferValues] = useState(null)
  const [alredyShowed, setAlredyShowed] = useState(0)
  const [pageToShow, setPageToShow] = useState(1)

  const context = {
    isAddingOpen,
    setAddingOpen,
    editedOfferValues,
    setEditedOfferValues,
    alredyShowed,
    setAlredyShowed,
    pageToShow,
    setPageToShow,
  }

  return (
    <AppContext.Provider value={context}>
      <RootTemplate>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route
              path='/:offerId'
              children={({ match }) => (
                <Offer match={match} />
              )}
            />
          </Switch>
        </Router>
      </RootTemplate>
    </AppContext.Provider>
  )
}

export default Root;

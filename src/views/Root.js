import React from 'react'
import RootTemplate from 'templates/RootTemplate';
import Home from 'views/Home';
import Offer from 'views/Offer';
import Navbar from 'components/organizms/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const Root = () => (
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
)

export default Root;

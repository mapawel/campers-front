import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AppContext from 'context';
import RootTemplate from 'templates/RootTemplate';
import Home from 'views/Home';
import SignInUp from 'views/SignInUp';
import Offer from 'views/Offer';
import Navbar from 'components/organizms/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from 'routes';


const Root = ({ isUserLogged }) => {
  const [isAddingOpen, setAddingOpen] = useState(false)
  const [editedOfferValues, setEditedOfferValues] = useState(null)

  const context = {
    isAddingOpen,
    setAddingOpen,
    editedOfferValues,
    setEditedOfferValues,
  }

  return (
    <AppContext.Provider value={context}>
      <RootTemplate>
        <Router>
          <Navbar />
          <Switch>

            <Route
              exact
              path={routes.home}
              children={({ match }) => (
                < Home match={match} />
              )}
            >
            </Route>

            <Route
              path={routes.myoffers}
              children={({ match }) => (
                <>
                  {isUserLogged ? (
                    < Home match={match} />
                  ) : (
                      <Redirect to={routes.home} />
                    )}
                </>
              )}
            >
            </Route>

            <Route
              path={routes.signup}
              children={({ match, history }) => (
                <>
                  {!isUserLogged ? (
                    <SignInUp match={match} history={history} />
                  ) : (
                      <Redirect to={routes.home} />
                    )}

                </>
              )}
            >
            </Route>

            <Route path={routes.login}
              children={({ match, history }) => (<>
                {!isUserLogged ? (
                  <SignInUp match={match} history={history} />
                ) : (
                    <Redirect to={routes.home} />
                  )}
              </>
              )}>
            </Route>

            <Route
              path={routes.offer}
              children={({ match }) => (
                <Offer match={match} />
              )}
            >
            </Route>

          </Switch>
        </Router>
      </RootTemplate>
    </AppContext.Provider >
  )
}

const mapStateToProps = state => ({
  isUserLogged: state.auth.token
})

export default connect(mapStateToProps)(Root);

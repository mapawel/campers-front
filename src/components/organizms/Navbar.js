import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import routes from 'routes';

const useStyles = makeStyles((theme) => ({
  link: {
    padding: '1rem 2rem',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  linkActive: {
    color: theme.palette.primary.main,
  },
  menuList: {
    display: 'flex',
    listStyle: 'none',
  }
}));

function Navbar({ loggedUserd }) {
  const classes = useStyles()
  return (
    <ul className={classes.menuList}>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        exact to={routes.home}>
        Home
        </NavLink></li>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        exact to={routes.myoffers}>
        My Offers
        </NavLink></li>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        to={routes.signup}>
        Sign up
        </NavLink></li>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        to={routes.login}>
        Log in
        </NavLink></li>
    </ul>
  )
}

Navbar.propTypes = {

}

const mapStateToProps = (state) => ({
  loggedUserd: state.auth.userId,
})

export default connect(mapStateToProps)(Navbar)


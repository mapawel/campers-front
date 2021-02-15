import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

function Navbar() {
  const classes = useStyles()
  return (
    <ul className={classes.menuList}>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        exact to='/'>
        Home
        </NavLink></li>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        to='/signup'>
        Sign up
        </NavLink></li>
      <li><NavLink
        className={classes.link}
        activeClassName={classes.linkActive}
        to='/login'>
        Log in
        </NavLink></li>
    </ul>
  )
}

Navbar.propTypes = {

}

export default Navbar


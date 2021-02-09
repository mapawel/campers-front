import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
      <ul>
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/6021b12a991bc34ef844ac35'>test offer</NavLink></li>
      </ul>
  )
}

Navbar.propTypes = {

}

export default Navbar


import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = props => (
  <nav className="nav flex-column">
    <NavLink 
      to="/capabilities"
      className="nav-link"
      activeClassName="is-active"
    >
      Capabilities
    </NavLink>
    <NavLink 
      to='/values'
      className="nav-link"
      activeClassName="is-active"
    >
      Values
    </NavLink>
    <NavLink 
      to='/about'
      className="nav-link"
      activeClassName="is-active"
    >
      About
    </NavLink>
    <NavLink
      to='/contact'
      className="nav-link"
      activeClassName="is-active"
    >
      Contact
    </NavLink>
  </nav>
);

export default Navigation;
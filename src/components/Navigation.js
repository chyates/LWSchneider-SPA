import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

const Navigation = props => (
  <nav className="nav flex-column">
    <NavLink
      to="/capabilities"
      className="nav-link"
      activeClassName="is-active"
      onClick={() => props.dispatch(scaleWindstop())}
    >
      Capabilities
    </NavLink>
    <NavLink
      to="/values"
      className="nav-link"
      activeClassName="is-active"
      onClick={() => props.dispatch(scaleWindstop())}
    >
      Values
    </NavLink>
    <NavLink
      to="/about"
      className="nav-link"
      activeClassName="is-active"
      onClick={() => props.dispatch(scaleWindstop())}
    >
      About
    </NavLink>
    <NavLink
      to="/contact"
      className="nav-link"
      activeClassName="is-active"
      onClick={() => props.dispatch(scaleWindstop())}
    >
      Contact
    </NavLink>
  </nav>
);

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(Navigation);
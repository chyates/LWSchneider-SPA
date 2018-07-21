
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavItem, NavLink as Link, NavbarBrand, NavbarToggler } from 'reactstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return <Navbar light expand="lg">
        <NavbarToggler 
          onClick={this.toggle} 
          style={{ 
          backgroundImage: this.state.isOpen 
            ? 'url(https://lws.impactpreview.com/wp-content/uploads/2018/07/closemenu.svg)' 
            : 'url(https://lws.impactpreview.com/wp-content/uploads/2018/07/hamburgermenu.svg)',
            backgroundRepeat: "no-repeat" 
          }} 
        />
        <NavbarBrand />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink to="/capabilities" className="nav-link" activeClassName="is-active">
                Capabilities
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/values" className="nav-link" activeClassName="is-active">
                Values
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about" className="nav-link" activeClassName="is-active">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" className="nav-link" activeClassName="is-active">
                Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>;
  }
}

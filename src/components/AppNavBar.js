import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavbarText, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

//import { withRouter } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';
import "../assets/css/navbar.css"

class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);

    this.state = {
      showUser: false,
      showAdmin: false,
      username: undefined,
      login: false
    };
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      const roles = [];

      user.authorities.forEach(authority => {
        roles.push(authority.authority)
      });
  
      this.setState({
        showUser: true,
        showAdmin: roles.includes("ROLE_ADMIN"),
        login: true,
        username: user.username
      });
    }
  }

  signOut = () => {
    AuthenticationService.signOut();
    this.props.history.push('/');
    window.location.reload();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
    <Navbar 
    className="Navbar" >
     
      <Nav className="mr-auto">
        <NavLink href="/home">Home</NavLink>
        {this.state.showUser && <NavLink href="/user">User</NavLink>}
        {this.state.showAdmin && <NavLink href="/admin">Admin</NavLink>}
      </Nav>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar
      >
        {
          this.state.login ? (
            <Nav className="ml-auto"
             navbar>
              <NavItem>
                  <NavbarText>
                    Signed in as: <a href="/profile">{this.state.username}</a>
                  </NavbarText>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.signOut}>SignOut</NavLink>
              </NavItem>
            </Nav>                 
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signin">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">SignUp</NavLink>
              </NavItem>
            </Nav>
          )
        }
      </Collapse>
    </Navbar>
    </div>)
  }
}

export default AppNavBar;
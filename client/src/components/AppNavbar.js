import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import AuthRedux from "../redux/auth";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Logout from "./Logout";

type Props = {
  isAuthenticated: Boolean,
  user: Object
};

class AppNavbar extends Component<Props> {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const authLink = (
      <Fragment>
        <NavItem>
          <span>
            <strong className="navbar-text mr-3">
              {this.props.user ? `Welcome ${this.props.user.name}` : ""}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLink = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Learn MERN</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/AslamPangestu/learn-mern">
                    Github
                  </NavLink>
                </NavItem>
                {this.props.isAuthenticated ? authLink : guestLink}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: AuthRedux.selectors.isAuthenticated(state),
  user: AuthRedux.selectors.user(state)
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);

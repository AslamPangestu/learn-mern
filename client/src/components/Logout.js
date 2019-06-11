import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import AuthRedux from "../redux/auth";

type Props = {
  logout: () => void
};

class Logout extends Component<Props> {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AuthRedux.actions.logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);

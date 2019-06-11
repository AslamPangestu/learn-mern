import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import AuthRedux from "../redux/auth";
import ErrorRedux from "../redux/error";

type Props = {
  isAuthenticated: Boolean,
  error: Object,
  register: () => void,
  clearError: () => void
};

class RegisterModal extends Component<Props> {
  state = {
    modal: false,
    name: "",
    email: "",
    message: null,
    password: ""
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ message: error.message });
      } else {
        this.setState({ message: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearError();
    this.setState({
      modal: !this.state.modal
    });
  };

  submitItem = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = { name, email, password };
    this.props.register(newUser);
  };
  changeState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.message ? (
              <Alert color="danger">{this.state.message}</Alert>
            ) : null}
            <Form onSubmit={this.submitItem}>
              <FormGroup>
                <Label for="name">Nama</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="mb-3"
                  onChange={this.changeState}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  className="mb-3"
                  onChange={this.changeState}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  placeholder="Your password"
                  onChange={this.changeState}
                />
                <Button
                  color="dark"
                  style={{ marginBottom: "2rem", marginTop: "2rem" }}
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: AuthRedux.selectors.isAuthenticated(state),
  error: ErrorRedux.selectors.error(state)
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(AuthRedux.actions.register(data)),
  clearError: () => dispatch(ErrorRedux.actions.clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);

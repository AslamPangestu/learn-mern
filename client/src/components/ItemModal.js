import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import ItemsRedux from "../redux/item";

type Props = {
  addItems: () => void,
  items: []
};

class ItemModal extends Component<Props> {
  state = {
    modal: false,
    name: "",
    count: 0
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  submitItem = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      count: this.state.count
    };
    //add item via addItem action
    this.props.addItems(newItem);
    this.toggle();
  };
  changeState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Shopping Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitItem}>
              <FormGroup>
                <Label for="item">Nama</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Shopping Item"
                  onChange={this.changeState}
                />
                <Label for="item">Jumlah</Label>
                <Input
                  type="text"
                  name="count"
                  id="total"
                  placeholder="Add Shopping Number"
                  onChange={this.changeState}
                />
                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Submit
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
  items: ItemsRedux.selectors.items(state)
});

const mapDispatchToProps = dispatch => ({
  addItems: data => dispatch(ItemsRedux.actions.addItems(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemModal);

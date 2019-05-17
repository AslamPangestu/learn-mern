import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

import { connect } from "react-redux";
import ItemsRedux from "../redux/item";

type Props = {
  getItems: () => void,
  items: []
};

class ShopingList extends Component<Props> {
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    const items = this.props.items;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const name = prompt("Enter Item");
            const count = prompt("Enter Count");
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name, count }]
              }));
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopingList">
            {items.map(({ id, name, count }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(item => item.id !== id)
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {name} {count}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: ItemsRedux.selectors.items(state)
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(ItemsRedux.actions.getItems)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopingList);

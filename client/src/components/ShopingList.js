import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import ItemsRedux from "../redux/item";

type Props = {
  getItems: () => void,
  deleteItems: () => void,
  items: []
};

class ShopingList extends Component<Props> {
  componentDidMount() {
    this.props.getItems();
  }

  onDelete = id => {
    this.props.deleteItems(id);
  };
  render() {
    const items = this.props.items;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopingList">
            {items.map(({ id, name, count }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDelete.bind(this, id)}
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
  getItems: () => dispatch(ItemsRedux.actions.getItems),
  deleteItems: id => dispatch(ItemsRedux.actions.deleteItems(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopingList);

import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import ItemsRedux from "../redux/item";

type Props = {
  getItems: () => void,
  deleteItems: () => void,
  items: [],
  isLoading: Boolean
};

class ShopingList extends Component<Props> {
  componentDidMount() {
    this.requestList();
  }

  requestList = async () => {
    await this.props.getItems();
  };

  onDelete = id => {
    this.props.deleteItems(id);
  };
  render() {
    if (!this.props.isLoading) {
      return (
        <Container>
          <ListGroup>
            <TransitionGroup className="shopingList">
              {this.props.items.map(({ _id, name, count }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDelete.bind(this, _id)}
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
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  items: ItemsRedux.selectors.items(state),
  isLoading: ItemsRedux.selectors.isLoading(state)
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(ItemsRedux.actions.getItems()),
  deleteItems: id => dispatch(ItemsRedux.actions.deleteItems(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopingList);

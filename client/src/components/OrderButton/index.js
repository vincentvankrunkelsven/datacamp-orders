import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "./OrderButton.css";
import { postOrders } from '../../services/ServerApi';

class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.submitOrder = this.submitOrder.bind(this);
  }

  createOrder(date) {
    return {
      user_id: this.props.activeUser,
      order: this.props.order,
      order_on: date.format('YYYY-MM-DD'),
    }
  }

  validProps() {
    return (
      true
    )
  }

  submitOrder() {
    if (!this.validProps()) return;
    const orders = [];
    let date = this.props.startDate.clone();
    while (!date.isSame(this.props.endDate, 'day')) {
      orders.push(this.createOrder(date));
      date = date.add('days', 1);
    }
    orders.push(this.createOrder(date));
    postOrders(orders).then(() => {
      this.props.onOrder();
    });
  }

  render() {
    return (
      <div className="OrderButton">
        <Button
          bsSize="large"
          bsStyle="success"
          onClick={this.submitOrder}
        >
          Place Order
        </Button>
      </div>
    );
  }
}

export default OrderButton;

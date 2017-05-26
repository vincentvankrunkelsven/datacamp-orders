import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import "./OrderInput.css";

class OrderInput extends Component {
  constructor(props) {
    super(props);

    this.onChangeOrder = this.onChangeOrder.bind(this);
  }

  onChangeOrder(event) {
    this.props.setOrder(event.target.value);
  }

  render() {
    return (
      <FormGroup className="OrderInput">
        <FormControl
          type="text"
          defaultValue={this.props.order}
          onChange={this.onChangeOrder}
        />
      </FormGroup>
    );
  }
}

export default OrderInput;

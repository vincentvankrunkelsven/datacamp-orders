import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { getAutocomplete } from '../../services/ServerApi';
import "./OrderInput.css";

class OrderInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autoComplete: [],
    }

    this.onChangeOrder = this.onChangeOrder.bind(this);
  }

  componentWillMount() {
    getAutocomplete(this.props.activeUser).then((autoComplete) => {
      this.setState({
        autoComplete,
      });
    });
  }

  onChangeOrder(text) {
    this.props.setOrder(text);
  }

  render() {
    return (
      <FormGroup className="OrderInput">
        <Typeahead
          options={this.state.autoComplete}
          defaultSelected={[this.props.order]}
          value={this.props.order}
          onInputChange={this.onChangeOrder}
          onSubmit={event => event.preventDefault()}
          placeholder="Place your order..."
        />
      </FormGroup>
    );
  }
}

export default OrderInput;

import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import { createUser } from '../../services/ServerApi';
import "./InitialForm.css";

class InitialForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  onChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  createNewUser(event) {
    this.setState({
      loading: true,
    });
    createUser(this.state.name).then(({ id }) => {
      if (id !== undefined) {
        this.props.setActiveUser(id);
      }
      this.props.hideInitialForm();
      this.setState({
        loading: false,
      });
    });
    event.stopPropagation();
  }

  render() {
    return (
      <div className="App">
        <div className="initial-form__wrapper">
          <div className="initial-form__popup">
            <img
              src={this.props.logo}
              className="App-logo initial-form__logo"
              alt="logo"
            />
            <h4>
              Enter your name
            </h4>
            <form
              onSubmit={this.createNewUser}
            >
              <FormGroup>
                <FormControl
                  className="initial-form__text-field"
                  type="text"
                  defaultValue={this.props.order}
                  onChange={this.onChangeName}
                />
              </FormGroup>
            </form>
            <Row>
              <Col xs={6}>
                <Button
                  className="initial-form__left"
                  bsStyle="primary"
                  onClick={this.props.hideInitialForm}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  className="initial-form__right"
                  bsStyle="success"
                  onClick={this.createNewUser}
                >
                  { this.state.loading ?
                    <i className="fa fa-spin fa-spinner" /> :
                    'Continue' }
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default InitialForm;

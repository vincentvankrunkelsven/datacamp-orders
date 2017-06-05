import React, { Component } from 'react';
import moment from 'moment';
import { PageHeader } from 'react-bootstrap';

import './App.css';
import sandwich from './sandwich.svg';
import UserList from './components/UserList';
import DatePicker from './components/DatePicker';
import OrderInput from './components/OrderInput';
import OrderButton from './components/OrderButton';
import OrderTable from './components/OrderTable';
import InitialForm from './components/InitialForm';
import { getOrders } from './services/ServerApi';
import { Col, Row } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };

    this.setActiveUser = this.setActiveUser.bind(this);
    this.setDateRange = this.setDateRange.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.refreshOrders = this.refreshOrders.bind(this);
    this.hideInitialForm = this.hideInitialForm.bind(this);
  }

  componentWillMount() {
    this.setState({
      startDate: moment(),
      endDate: moment(),
      activeUser: parseInt(localStorage.getItem('activeUser'), 10) || -1,
      order: localStorage.getItem('order') || '',
      showInitialForm: localStorage.getItem('activeUser') === null,
    });
  }

  componentDidMount() {
    this.refreshOrders();
  }

  setActiveUser(id) {
    this.setState({
      activeUser: id,
    });
    localStorage.setItem('activeUser', id);
  }

  setDateRange({ startDate, endDate }) {
    this.setState({
      startDate,
      endDate,
    });
  }

  setOrder(order) {
    this.setState({
      order,
    });
    localStorage.setItem('order', order);
  }

  hideInitialForm() {
    this.setState({
      showInitialForm: false,
    });
  }

  refreshOrders() {
    getOrders().then(orders => {
      this.setState({ orders });
    })
  }

  render() {
    if (this.state.showInitialForm) {
      return (
        <InitialForm
          logo={sandwich}
          hideInitialForm={this.hideInitialForm}
          setActiveUser={this.setActiveUser}
        />
      );
    }
    return (
      <div className="App">
        <PageHeader>
          Sandwiches
          <img src={sandwich} className="App-logo" alt="logo" />
        </PageHeader>
        <Row>
          <Col sm={4}>
            <UserList
              activeElement={this.state.activeUser}
              setActiveUser={this.setActiveUser}
            />
          </Col>
          <Col sm={8}>
            <OrderInput
              setOrder={this.setOrder}
              activeUser={this.state.activeUser}
              order={this.state.order}
            />
            <DatePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              setDateRange={this.setDateRange}
            />
            <OrderButton
              activeUser={this.state.activeUser}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              order={this.state.order}
              onOrder={this.refreshOrders}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <OrderTable
              orders={this.state.orders}
              refreshOrders={this.refreshOrders}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

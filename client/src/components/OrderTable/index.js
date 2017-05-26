import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import moment from 'moment';
import { isEmpty } from '../../utils/array';
import { deleteOrder } from '../../services/ServerApi';

class OrderTable extends Component {
  constructor(props) {
    super(props);

    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete(id) {
    return function onClickDeleteBound() {
      deleteOrder(id).then(() => this.props.refreshOrders());
    }.bind(this);
  }

  render() {
    if (isEmpty(this.props.orders)) return null;

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Order</th>
            <th>Order Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { this.props.orders.map(({ id, name, order, order_on: orderDate, ordered }) => (
            <tr>
              <td>{name}</td>
              <td>{order}</td>
              <td>{moment(orderDate).format('YYYY-MM-DD')}</td>
              <td>
                { ordered ?
                    <Button
                      bsStyle="success"
                      disabled
                    >
                      Ordered
                    </Button>
                  :
                    <Button
                      onClick={this.onClickDelete(id)}
                      bsStyle="danger"
                    >
                      Delete
                    </Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default OrderTable;

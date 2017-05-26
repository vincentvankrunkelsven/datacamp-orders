import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { isEmpty } from '../../utils/array';
import { getUsers } from '../../services/ServerApi';
import './UserList.css';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    getUsers().then(users => this.setState({ users }));
  }

  setActiveElement(id) {
    return function boundSetActiveElement() {
      this.props.setActiveUser(id);
    }.bind(this);
  }

  render() {
    return (
      <div className="UserList">
        { !isEmpty(this.state.users) &&
          <ListGroup>
            { this.state.users.map(({ name, id }) => (
                <ListGroupItem
                  key={id}
                  onClick={this.setActiveElement(id)}
                  active={this.props.activeElement === id}
                >
                  {name}
                </ListGroupItem>
            ))}
          </ListGroup>
        }
      </div>
    );
  }
}

export default UserList;

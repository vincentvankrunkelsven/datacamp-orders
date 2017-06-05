import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

class DataCampDatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    let startDate = this.props.startDate;
    let endDate = this.props.endDate;
    if (!date.isSame(this.props.startDate, 'week')) {
      startDate = date;
      endDate = date;
    } else if (date < this.props.startDate) {
      startDate = date;
    } else if (date > this.props.endDate) {
      endDate = date;
    } else if (this.props.startDate.isSame(date, 'day') ||
               this.props.endDate.isSame(date, 'day')) {
      startDate = date;
      endDate = date;
    } else if (date.diff(this.props.startDate) > this.props.endDate.diff(date)) {
      endDate = date;
    } else {
      startDate = date;
    }
    this.props.setDateRange({
      startDate,
      endDate,
    });
  }

  isValidDay(date) {
    return date >= moment().startOf('day') && date.day() < 6 && date.day() > 0;
  }

  render() {
    return (
      <div className="DatePicker">
        <DatePicker
          inline
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          filterDate={this.isValidDay}
          locale="en-gb"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DataCampDatePicker;

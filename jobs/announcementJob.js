const knex = require('../db/knex');
const moment = require('moment');
const { sendOrderUpdate } = require('../notifications/slack');
const { createOrdersString } = require('./ordersJob');

function createLine({ name, order }) {
  return `- *${name}*: ${order}`;
}

function runJob() {
  const today = moment().format("YYYY-MM-DD");
  createOrdersString(knex('orders').where({ order_on: today }), createLine)
    .then((orders) => {
      sendOrderUpdate(orders, today);
    });
}

module.exports = {
  runJob,
};

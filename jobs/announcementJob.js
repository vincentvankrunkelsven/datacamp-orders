const knex = require('../db/knex');
const moment = require('moment');
const { sendOrderUpdate } = require('../notifications/slack');
const { getOpenOrdersOf } = require('./ordersJob');

function createLine({ name, order }) {
  return `- *${name}*: ${order}`;
}

function runJob() {
  const today = moment().format("YYYY-MM-DD");
  getOpenOrdersOf(today, createLine)
    .then(({ ordersString }) => ordersString && sendOrderUpdate(ordersString, today));
}

module.exports = {
  runJob,
};

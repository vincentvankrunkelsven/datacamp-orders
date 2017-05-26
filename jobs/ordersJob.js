const knex = require('../db/knex');
const moment = require('moment');

const mailer = require('../mailers/orderMailer');

function createLine({ name, order }) {
  return `${name}: ${order}`;
}

function createMail(orders, today) {
  return `Beste,

Hierbij de bestelling voor DataCamp van ${today}.

${orders}

Leveringsadres:
DataCamp
Regus Office Space
Martelarenplein 16
3000 Leuven

Met vriendelijke groeten,

DataCamp`;
}

function createOrdersString(orders, customCreateLine = createLine) {
  return orders
    .innerJoin('users', 'users.id', 'user_id')
    .map(customCreateLine)
    .reduce((all, order) => `${all}\n${order}`);
}

function runJob() {
  const today = moment().format("YYYY-MM-DD");
  createOrdersString(knex('orders').where({ order_on: today }))
    .then((orders) => {
      if (orders !== undefined) {
        mailer.sendOrderEmail(createMail(orders, today), today);
        // console.log(createMail(orders, today));
      }
    });
  knex('orders').where({ order_on: today }).update({ ordered: 1 });
}

module.exports = {
  runJob,
  createOrdersString,
}

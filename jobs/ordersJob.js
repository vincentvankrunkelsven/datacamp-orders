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

function getOpenOrdersOf(order_on, customCreateLine = createLine) {
  return knex('orders')
    .select(['order', 'name', 'orders.id'])
    .where({ order_on, ordered: false })
    .innerJoin('users', 'users.id', 'user_id')
    .then((orders) => {
      if (orders.length > 0) {
        const ordersString = orders.map(customCreateLine).join('\n');
        const ids = orders.map(order => order.id);
        return {
          ordersString,
          ids,
        };
      } else {
        return { ids: [] };
      }
    });
}

function runJob() {
  const today = moment().format("YYYY-MM-DD");
  getOpenOrdersOf(today).then(({ ordersString, ids }) => {
    if (ordersString !== undefined) {
      mailer.sendOrderEmail(createMail(orders, today), today);
      // console.log(createMail(ordersString, today));
    }
    return knex('orders').whereIn('id', ids).update({ ordered: true });
  });
}

module.exports = {
  runJob,
  getOpenOrdersOf,
}

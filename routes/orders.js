const express = require('express');
const moment = require('moment');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  knex('orders')
    .select('orders.id', 'name', 'order', 'order_on', 'ordered')
    .where('order_on', '>=', today)
    .innerJoin('users', 'users.id', 'user_id')
    .orderBy('order_on')
    .then(orders => res.send(orders));
});

router.post('/create', (req, res) => {
  const { orders } = req.body;
  knex('orders').insert(orders).returning('id').then((ids) => {
    res.send(ids);
  }).catch((error) => {
    res.send({ error: 'Could not create orders', message: error });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  knex('orders').where({ id }).del().then(() => {
    res.send({ id });
  }).catch(() => {
    res.send({ error: 'Could not delete order', message: error });
  })
});

module.exports = router;

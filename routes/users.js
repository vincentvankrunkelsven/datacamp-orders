const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('users').select().then(users => res.send(users));
});

router.post('/create', (req, res) => {
  const { name } = req.body;
  knex('users').insert({ name }).returning('id').then(([id]) => {
    res.send({ id });
  }).catch((error) => {
    res.send({ error: 'Could not create user', message: error });
  });
});

module.exports = router;

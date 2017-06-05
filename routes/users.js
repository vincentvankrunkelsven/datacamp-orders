const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
// const { unescape } = require('lodash');

const router = express.Router();

const knex = require('../db/knex');


router.get('/', (req, res) => {
  knex('users').select().then(users => res.send(users));
});

router.post('/create', (req, res) => {
  const { name } = req.body;
  knex('users').where({ name }).then((results) => {
    if (results.length === 0) {
      return knex('users').insert({ name }).returning('id');
    } else {
      return Promise.resolve([results[0].id]);
    }
  }).then(([id]) => {
    res.send({ id });
  }).catch((error) => {
    res.send({ error: 'Could not create user', message: error });
  });
});

router.get('/autocomplete/:userId', (req, res) => {
  const { userId } = req.params;
  // Plan for future: scrape panache-leuven menu
  // fetch('http://www.panache-leuven.be/bestelling.php')
  //   .then(res => res.text())
  //   .then((body) => {
  //     const autoComplete = [];
  //     const $ = cheerio.load(body);
  //     $(".groepH2").each(function() {
  //       const group = $(this).text();
  //       $(this).parent().find(".bestelNaam").each(function() {
  //         autoComplete.push(unescape(group + ' - ' +$(this).text()));
  //       });
  //     });
  //     res.send(autoComplete);
  //   });
  knex('orders')
    .select('order')
    .count('ordered as n')
    .orderBy('n', 'desc')
    .groupBy('order')
    .havingRaw('count(ordered) >= ?', 1)
    .then((orders) => {
      res.send(orders.map(order => order.order));
    });
});

module.exports = router;

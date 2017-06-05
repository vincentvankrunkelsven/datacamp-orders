const express = require('express');
const router = express.Router();
const moment = require('moment');

const { SlackMessage, SlackAttachment } = require('../notifications/slack');
const knex = require('../db/knex');

router.post('/hook', (req, res) => {
  console.log({body: req.body});

  const { user: { name }} = req.body;
  const slackAttachment = new SlackAttachment('', 'order_reply', {
    color: '#83c967',
  });
  const slackMessage = new SlackMessage('', {
    response_type:"ephemeral",
    replace_original: false,
    delete_original: false,
  }).addAttachment(slackAttachment);
  const today = moment().format("YYYY-MM-DD");

  knex('users').whereRaw('LOWER(name) = LOWER(?)', name)
    .then((users) => {
      if (users.length === 1) {
        return Promise.all([
          users[0].id,
          knex('orders').where({ user_id: users[0].id, order_on: today })
        ]);
      } else {
        slackAttachment.set('color', '#c96768');
        if (users.length > 1) {
          slackAttachment.set('text',
            "Can't order, found multiple possible users to match to your " +
            "Slack name.");
        } else {
          slackAttachment.set('text',
            "Can't order, didn't find a user that matches your Slack name");
        }
        return Promise.reject();
      }

    }).then(([userId, orders]) => {
      if (orders.length > 0) {
        slackAttachment.set('color', '#fdc551');
        slackAttachment.set('text', `You already ordered: ${orders[0].order}.`);
        return Promise.reject();
      } else {
        return Promise.all([
          userId,
          knex('orders')
            .where({ user_id: userId })
            .where('order_on', '<', today)
            .orderBy('order_on', 'desc')
            .limit(1)]);
      }
    }).then(([userId, orders]) => {
      if (orders.length === 0) {
        slackAttachment.set('color', '#c96768');
        slackAttachment.set('text', "Can't order, could not find previous order.");
      } else {
        slackAttachment.set('text', `You ordered: ${orders[0].order}`)
        return knex('orders').insert({
          user_id: userId,
          order: orders[0].order,
          order_on: today
        });
      }
    }, (error) => {console.log(error)}).then(() => res.send(slackMessage.toJson()));
});

module.exports = router;

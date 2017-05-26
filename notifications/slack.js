const config = require('./.config.json')['slack'];
const fetch = require('node-fetch');

function createMessage(orders, date) {
  return `Sandwiches for *${date}* will be ordered in *5 minutes*.
Current orders are:
${orders}`;
}

function sendOrderUpdate(orders, date) {
  fetch(config['webhook'], {
    method: 'POST',
    body: JSON.stringify({ text: createMessage(orders, date) }),
    headers: { 'Content-Type': 'application/json' }
  });
}

module.exports = {
  sendOrderUpdate,
}

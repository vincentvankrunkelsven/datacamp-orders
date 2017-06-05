const config = require('./.config')['slack'];
const fetch = require('node-fetch');

DEFAULT_ID = 'no_id';
DEFAULT_TEXT = '';
DEFAULT_COLOR = '#33AACC';
DEFAULT_FALLBACK = "Upgrade your Slack client to use messages like these.";
DEFAULT_TYPE = 'default';

class SlackMessage {
  constructor(text = DEFAULT_TEXT, options = {}) {
    this.json = Object.assign({ text }, options);
  }

  set(field, value) {
    this.json[field] = value;
  }

  addAttachment(attachment) {
    if (this.json.attachments === undefined) this.json.attachments = [];
    this.json.attachments.push(attachment);
    return this;
  }

  toJson() {
    let json = this.json;
    if (this.json.attachments !== undefined) {
      json = Object.assign(json, {
        attachments: this.json.attachments.map(attachment => attachment.toJson()),
      })
    }
    return json;
  }
}

class SlackAttachment extends SlackMessage {
  constructor(text, id = DEFAULT_ID, options = {}) {
    super(text, Object.assign({
      callback_id: id,
      color: DEFAULT_COLOR,
      fallback: DEFAULT_FALLBACK,
      attachment_type: DEFAULT_TYPE,
    }, options));
  }

  addAction(action) {
    if (this.json.actions === undefined) this.json.actions = [];
    this.json.actions.push(action);
    return this;
  }

  toJson() {
    let json = this.json;
    if (this.json.actions !== undefined) {
      json = Object.assign(json, {
        actions: this.json.actions.map(action => action.toJson()),
      })
    }
    return json;
  }
}

class SlackButton extends SlackMessage {
  constructor(text, id = DEFAULT_ID, options = {}) {
    super(text, Object.assign({
      name: id,
      type: 'button',
      value: text.replace(/\s+/, '_').toLowerCase(),
    }, options));
  }
}

function createSlackMessage(orders, date) {
  const slackMessage =
    new SlackMessage(
      `Sandwiches for *${date}* will be ordered in *5 minutes*.\n` +
      `Current orders are:\n${orders}`);
  const buttonAttachment =
    new SlackAttachment('Do you want to order the same as last time?', 'order');
  const slackButton = new SlackButton('Order Now', 'same_order');
  return slackMessage.addAttachment(buttonAttachment.addAction(slackButton));
}

function sendOrderUpdate(orders, date) {
  const slackMessage = createSlackMessage(orders, date);
  fetch(config['webhook'], {
    method: 'POST',
    body: JSON.stringify(slackMessage.toJson()),
    headers: { 'Content-Type': 'application/json' }
  });
}

module.exports = {
  sendOrderUpdate,
  SlackMessage,
  SlackAttachment,
  SlackButton,
}

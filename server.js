if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');

// Use bluebird promises
global.Promise = require('bluebird');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('combined'));

// Routes
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/slack', require('./routes/slack'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Listening on http://localhost:${app.get('port')}`);
});

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const { zoop } = require('./actions');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.post('*', async (req, res) => {
  console.log({headers: req.headers });
  const payload = req.body;
  const eventType = payload.event.type;
  switch (eventType) {
    case 'message':
      await zoop(payload);
      break;
    default:
      console.log(`No handlers for event type: ${eventType}`);
      break;
  }
  res.status(200).end();
});

module.exports = app;

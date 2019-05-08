'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const slack = require('../../services/slack');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.post('*', async (req, res) => {
  const payload = req.body;
  const match = payload.event.text.match(/^a(h+)$/);
  if (!!match) {
    const numberOfHs = match[0].length;
    const zoop = ['zo', ...new Array(numberOfHs).fill('o'), 'p'].join('');
    const body = {
      channel: payload.event.channel,
      text: zoop,
    };
    console.log(JSON.stringify({ body }, null, 2));
    const response = await slack.postMessage({ body });
    console.log(JSON.stringify(await response.json(), null, 2));
    res.status(200).send();
    return;
  }
  res.status(201).send();
});

module.exports = app;

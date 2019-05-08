'use strict';

const fetch = require('node-fetch');
require('dotenv').config({ path: '../../.env' });

const BASE_URL = 'https://slack.com/api';
const CONFIGS = {
  postMessage: {
    method: 'POST',
    url: `${BASE_URL}/chat.postMessage`,
  },
};
const { SLACK_BOT_TOKEN } = process.env;

module.exports = new Proxy(CONFIGS, {
  get(configs, name) {
    const config = configs[name];
    const method = config.method;
    const url = config.url;
    return ({ body = {} }) => {
      const headers = {
        ...(method !== 'GET' && { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      };
      console.log({ headers });
      const options = {
        ...(method !== 'GET' && { body: JSON.stringify(body) }),
        headers,
        method,
      };
      console.log({ url });
      return fetch(url, options);
    };
  },
});

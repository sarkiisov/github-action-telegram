import * as core from '@actions/core';
import { Octokit } from "octokit";
import Bot from 'node-telegram-bot-api';


const telegramBotToken = core.getInput('telegramBotToken');
const githubToken = core.getInput('githubToken');

const repositoryOwner = core.getInput('repositoryOwner');
const repositoryName = core.getInput('repositoryName');
const pullNumber = core.getInput('pullNumber');

(async function() {
  const bot = new Bot(telegramBotToken);
  const octokit = new Octokit({ auth: githubToken });

  const commits = await octokit.rest.pulls.listCommits({
    owner: repositoryOwner,
    repo: repositoryName,
    pull_number: parseInt(pullNumber),
  });

  bot.sendMessage(-619418505, 'Hello from bot');

  // const ev = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
  console.log(`VALUE: `, commits);
})()
/* eslint-disable @typescript-eslint/naming-convention */
import * as core from '@actions/core';
import * as github from '@actions/github';
import Bot from 'node-telegram-bot-api';

const telegramBotToken = core.getInput('telegramBotToken');
// const githubToken = core.getInput('githubToken');

// const repositoryOwner = core.getInput('repositoryOwner');
// const repositoryName = core.getInput('repositoryName');
// const pullNumber = core.getInput('pullNumber');

const chatId = 345021341;

(async function () {
  // const { owner, repo: repositoryName } = github.context.repo;
  // const { number: pullNumber } = github.context.payload;

  const bot = new Bot(telegramBotToken);
  // const octokit = github.getOctokit(githubToken);

  const {
    title, body, number, commits
  } = github.context.payload.pull_request;

  const { login, html_url } = github.context.payload.sender;

  // const reviewers = octokit.rest.pulls.listReviews({
  //   owner,
  //   repo: repositoryName,
  //   pull_number: pullNumber
  // });

  // const { data } = await octokit.rest.pulls.listFiles({
  //   owner: repositoryOwner,
  //   repo: repositoryName,
  //   pull_number: parseInt(pullNumber),
  // });

  // const { additions, deletions } = data.reduce((result, current) => {
  //   result.additions += current.additions;
  //   result.deletions += current.deletions;
  //   return result;
  // }, { additions: 0, deletions: 0 });

  bot.sendMessage(chatId, `${title}, ${body}, ${number}, ${commits}, ${login}, ${html_url}`);
  console.log('Repo context: ', JSON.stringify(github.context.repo));
  console.log('Payload: ', JSON.stringify(github.context.payload));
  // bot.sendMessage(chatId, JSON.stringify(github.context.payload));
}());

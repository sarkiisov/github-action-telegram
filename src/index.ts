/* eslint-disable @typescript-eslint/no-unused-vars */
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

  const { action } = github.context.payload;

  const {
    title, number, commits, html_url: pullUrl, additions, deletions, changed_files
  } = github.context.payload.pull_request;

  // const reviewers = requested_reviewers.reduce((accumulator, currentValue) => {
  //   const line = `${currentValue.login} ${currentValue.html_url} \n`;
  //   return accumulator + line;
  // }, '');

  const { login, html_url: senderUrl } = github.context.payload.sender;

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

  const message = `
Pull request ${action} by [${login}](${senderUrl})

*${title} (${number})*

[View details](${pullUrl})
`;

  // bot.sendMessage(chatId, `PullUrl: ${pullUrl}, Title ${title}, Body: ${body},
  // Number: ${number}, Commits: ${commits}, SenderLogin: ${login}, SenderUrl: ${senderUrl}, Additions: ${additions}, Deletions: ${deletions}, CahngedFiles: ${changed_files}, Reviewers ${reviewers}`);
  bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
  console.log('Repo context: ', JSON.stringify(github.context.repo));
  console.log('Payload: ', JSON.stringify(github.context.payload));
  // bot.sendMessage(chatId, JSON.stringify(github.context.payload));
}());

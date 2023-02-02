import * as core from '@actions/core';
import * as github from '@actions/github';
import Bot from 'node-telegram-bot-api';

const telegramBotToken = core.getInput('telegramBotToken');
const telegramChatId = core.getInput('telegramChatId');

(function () {
  const bot = new Bot(telegramBotToken);

  const {
    title: pullTitle,
    number: pullNumber,
    html_url: pullUrl,
    created_at: createdAt,
    requested_reviewers: requestedReviewers
  } = github.context.payload.pull_request;

  const {
    login: senderLogin,
    html_url: senderUrl
  } = github.context.payload.sender;

  const {
    name: repositoryName,
    html_url: repositoryUrl
  } = github.context.payload.repository;

  const baseBranch = github.context.payload.pull_request.base.ref;
  const compareBranch = github.context.payload.pull_request.head.ref;

  const formatKeyValueString = (key: string, value: string) => `<b>${key}: </b>${value}`;

  const formattedReviewers = requestedReviewers.map((user) => `<a href="${user.html_url}">${user.login}</a>`).join(',\n');

  const notificationMessage = `
<a href="${senderUrl}">${senderLogin}</a> created a pull request
<a href="${pullUrl}"><b>#${pullNumber} ${pullTitle}</b></a>

${formatKeyValueString('Repository', `<a href="${repositoryUrl}">${repositoryName}</a>`)}
${formatKeyValueString('Created', createdAt.split(' ')[0])}
${formatKeyValueString('Branch', `${baseBranch} ← ${compareBranch}`)}
${formatKeyValueString('Reviewers', formattedReviewers)}
`;

  bot.sendMessage(
    telegramChatId,
    notificationMessage,
    {
      parse_mode: 'HTML',
      disable_web_page_preview: true
    }
  );
}());

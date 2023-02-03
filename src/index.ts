import * as core from '@actions/core';
import * as github from '@actions/github';
import Bot from 'node-telegram-bot-api';
import { formatKeyValueString, formatReviewersArray, formatUrl } from './utils';

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

  const notificationMessage = `
<a href="${senderUrl}">${senderLogin}</a> created a pull request
<a href="${pullUrl}"><b>#${pullNumber} ${pullTitle}</b></a>

${formatKeyValueString('Repository', formatUrl(repositoryName, repositoryUrl))}
${formatKeyValueString('Created', createdAt)}
${formatKeyValueString('Branch', `${baseBranch} ← ${compareBranch}`)}
${formatKeyValueString('Reviewers', formatReviewersArray(requestedReviewers))}
`;

  bot.sendMessage(
    telegramChatId,
    notificationMessage,
    { parse_mode: 'HTML', disable_web_page_preview: true }
  );
}());

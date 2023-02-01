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
    additions,
    deletions,
    changed_files: changedFiled
  } = github.context.payload.pull_request;

  const {
    login: senderLogin,
    html_url: senderUrl
  } = github.context.payload.sender;

  const {
    name: repositoryName,
    html_url: repositoryUrl
  } = github.context.payload.repository;

  const notificationMessage = `
⤴️<a href="${pullUrl}"><b>#${pullNumber} ${pullTitle}</b></a>

Pull request created by <a href="${senderUrl}">${senderLogin}</a>
<b>Repository:</b> <a href="${repositoryUrl}">${repositoryName}</a>
<b>Changed files:</b> ${changedFiled}
<b>Additions:</b> +${additions}
<b>Deletions:</b> -${deletions}
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

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
  const bot = new Bot(telegramBotToken);
  // const octokit = github.getOctokit(githubToken);

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

  //   const message = `
  // *Открыт новый PR*
  // 🖊️ *Изменено файлов:* ${data.length}
  // 🟩 *Добавлено:* ${additions} строк
  // 🟥 *Удалено:* ${deletions} строк
  // [Открыть на GitHub](https://github.com/${repositoryOwner}/${repositoryName}/pull/${pullNumber})`;

  bot.sendMessage(chatId, 'Hello', { parse_mode: 'MarkdownV2' });
  console.log('Repo context: ', JSON.stringify(github.context.repo));
  console.log('Payload: ', JSON.stringify(github.context.payload));
  // bot.sendMessage(chatId, JSON.stringify(github.context.payload));
}());

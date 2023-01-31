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

  const { data } = await octokit.rest.pulls.listFiles({
    owner: repositoryOwner,
    repo: repositoryName,
    pull_number: parseInt(pullNumber),
  });

  const { additions, deletions } = data.reduce((result, current) => {
    result.additions += current.additions;
    result.deletions += current.deletions;
    return result;
  }, { additions: 0, deletions: 0 })

  const message = `
<b>Открыт новый PR</b>

Изменено файлов: ${data.length}
Добавлено:
🟩 <u>${additions}</u> строк
🟥 <u>${deletions}</u> строк

(Открыть на GitHub)[https://github.com/${repositoryOwner}/${repositoryName}/pull/${pullNumber}]`

  bot.sendMessage(-619418505, message);
  // bot.sendMessage(-619418505, JSON.stringify(data));
})()
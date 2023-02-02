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
    title, body, number, commits, html_url: pullUrl, additions, deletions, changed_files, requested_reviewers
  } = github.context.payload.pull_request;

  const reviewers = requested_reviewers.reduce((accumulator, currentValue) => {
    const line = `<a href="${currentValue.html_url}">${currentValue.login}</a> `;
    return accumulator + line;
  }, '');

  const { login: senderLogin, html_url: senderUrl } = github.context.payload.sender;
  const { name: repositoryName, html_url: repositoryUrl } = github.context.payload.repository;
  const { login: ownerLogin, html_url: ownerUrl } = github.context.payload.repository.owner;

  const baseBranch = github.context.payload.pull_request.base.ref;
  const compareBranch = github.context.payload.pull_request.head.ref;

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

  const getReviewers = () => {
    if (requested_reviewers.length !== 0) {
      return `<b>Reviewers:\n</b>${reviewers}`;
    }
    return '';
  };

  const message = `
⤴️ <a href="${pullUrl}"><b>#${number} ${title}</b></a> 

Pull request created by <a href="${senderUrl}">${senderLogin}</a>

<b>Repository:</b> <a href="${repositoryUrl}">${repositoryName}</a>
<b>Changed files:</b> ${changed_files}
<b>Additions:</b> +${additions}
<b>Deletions:</b> -${deletions}
${getReviewers()}
`;

  const m1 = `
Commits: <b>${commits}</b>
`;
  // bot.sendMessage(chatId, message, { parse_mode: 'HTML', disable_web_page_preview: true });
  // bot.sendMessage(chatId, `PullUrl: ${pullUrl}, Title ${title}, Body: ${body},
  // Number: ${number}, Commits: ${commits}, SenderLogin: ${login}, SenderUrl: ${senderUrl}, Additions: ${additions}, Deletions: ${deletions}, CahngedFiles: ${changed_files}, Reviewers ${reviewers}`);
  // console.log('Repo context: ', JSON.stringify(github.context.repo));
  console.log('Payload: ', JSON.stringify(github.context.payload));
  // bot.sendMessage(chatId, JSON.stringify(github.context.payload));
}());

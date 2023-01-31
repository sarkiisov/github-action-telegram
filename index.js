const core = require('@actions/core');

const secret = core.getInput('secret');
const formattedSecret = secret.toUpperCase();

(function() {
  console.log(`Secret variable: `, formattedSecret);
})()
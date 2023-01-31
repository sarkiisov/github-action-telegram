const core = require('@actions/core');

const secret = core.getInput('secret');

(function() {
  console.log(`Secret variable: `, secret);
})()
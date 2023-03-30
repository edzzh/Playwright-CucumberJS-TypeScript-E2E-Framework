/*
 * This file is used by the cucumber-js command to run your features.
*/

// Setting CLI options for cucumber-js
const options = [
  '--require-module ts-node/register',
  '--require ./step_definitions/**/*.ts',
  '--require ./helpers/**/*.ts',
  '--format summary',
  '--format json:reports/cucumber_report.json',
  '--publish-quiet true',
]

// Sertting the cucumber runner
const runner = [
  './features/**/*.feature',
  ...options
].join(' ');

module.exports = { runner }
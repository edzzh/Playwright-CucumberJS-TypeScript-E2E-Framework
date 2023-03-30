import { 
  Before, 
  BeforeAll, 
  After, 
  AfterAll,
  BeforeStep,
  AfterStep,
  setDefaultTimeout,
  ITestCaseHookParameter,
  ITestStepHookParameter,
  formatterHelpers
} from "@cucumber/cucumber";
import { Browser } from "@playwright/test"
import WebBrowser from "../config/Browser";
import UIActions from './UIActions';
import Logger from '../config/Logger';
import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;

setDefaultTimeout(Number.parseInt(envConfig.TEST_TIMEOUT, 10) * 60000);

let browser: Browser;

BeforeAll(async function () {
  Logger.info(`Launching WEB Browser - ${envConfig.BROWSER ?? "chromium"}`)

  browser = await WebBrowser.launch();
});

AfterAll(async function () {
  Logger.info(`Closing WEB Browser`);
  await browser.close();
});

Before(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
  Logger.testBegin(`TEST SCENARIO: ${pickle.name}`);

  this.context = await browser.newContext({
    viewport: null,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: "./videos" } : undefined,
  });

  this.page = await this.context?.newPage();
  this.web = new UIActions(this.page);
});

After(async function ({ result, pickle, gherkinDocument}: ITestCaseHookParameter) {
  await this.page?.close();
  await this.context?.close();

  Logger.testEnd(`${pickle.name}:`, (result.status) ? result.status + ' ✅' : result.status + ' ❌');
});

BeforeStep(async function ({ pickleStep }: ITestStepHookParameter) {
  Logger.info(pickleStep.text.toUpperCase());
});

AfterStep(async function ({ gherkinDocument, pickleStep, result }: ITestStepHookParameter) {
  const step_status = (result.status === 'PASSED') ? '✅' : '❌';
  
  if (result.status !== 'FAILED') {
    Logger.info(`${result.status.toUpperCase()} ${step_status}`);
  } else {
    Logger.error(`${result.status.toUpperCase()} ${step_status}`);
  }
});

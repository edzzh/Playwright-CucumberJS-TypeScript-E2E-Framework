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
import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;

setDefaultTimeout(Number.parseInt(envConfig.TEST_TIMEOUT, 10) * 60000);

let browser: Browser;

BeforeAll(async function () {
  console.log('-'.repeat(120));
  console.log(`[${new Date()}] Launching WEB Browser - ${envConfig.BROWSER ?? "chromium"}`);
  console.log('-'.repeat(120));

  browser = await WebBrowser.launch();
});

AfterAll(async function () {
  console.log('\n' + '-'.repeat(120));
  console.log(`[${new Date()}] Closing WEB Browser`);
  console.log('-'.repeat(120));

  await browser.close();
});

Before(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
  const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
  console.log('TEST SCENARIO:', pickle.name);

  this.context = await browser.newContext({
    viewport: null,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: "./videos" } : undefined,
  });

  this.page = await this.context?.newPage();
  this.web = new UIActions(this.page);
});

After(async function () {
  await this.page?.close();
  await this.context?.close();
  console.log('\n' + '-'.repeat(120));
  console.log(`[${new Date()}] Closing Page & Context Instances of WEB`);
  console.log('-'.repeat(120));
});

BeforeStep(async function ({ pickleStep }: ITestStepHookParameter) {
  console.log(`- ${pickleStep.text.toUpperCase()}`);
});

AfterStep(async function ({ gherkinDocument, pickleStep, result }: ITestStepHookParameter) {
  const emoji = (result.status === 'PASSED') ? '✅' : '❌';
  console.log(`> ${result.status.toUpperCase()} ${emoji} `);
});

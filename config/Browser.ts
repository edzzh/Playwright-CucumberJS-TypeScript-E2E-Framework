import { chromium, ChromiumBrowser, firefox, FirefoxBrowser, webkit, WebKitBrowser, LaunchOptions } from '@playwright/test';
import { BrowserType } from './BrowserConstants';
import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;

const browserOptions: LaunchOptions = {
  headless: false,
  slowMo: 100,
  args: [
    "--start-maximized", 
    "--disable-notifications", 
    "--disable-extensions",
    "--disable-infobars",
    "--disable-popup-blocking",
    "--disable-translate",
    "--disbale-plugins",
    "-incognito",
  ],
  firefoxUserPrefs: {
    "media.navigator.streams.fake": true,
    "media.navigator.permission.disabled": true,
  },
  timeout: Number.parseInt(envConfig.BROSWER_LAUNCH_TIMEOUT, 10),
  // downloadsPath: "./downloads",
};

export default class Browser {
  public static async launch() {
    const browserType = envConfig.BROWSER;
    let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;

    switch (browserType) {
      case BrowserType.CHROMIUM:
        browser = await chromium.launch(browserOptions);
        break;
      case BrowserType.FIREFOX:
        browser = await firefox.launch(browserOptions);
        break;
      case BrowserType.WEBKIT:
        browser = await webkit.launch(browserOptions);
        break;
      default:
        browser = await chromium.launch(browserOptions);
    }

    return browser;
  }
}

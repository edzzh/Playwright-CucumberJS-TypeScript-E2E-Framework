import { Page } from "@playwright/test";
import UIElementActions from "./UIElementActions";
import { CommonConstants } from "../config/CommonConstants";

export default class UIActions {
  private elementAction: UIElementActions;

  constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
  }

  /*
  * Returns Page object
  */
  public getPage(): Page {
    return this.page;
  }

  /*
  * Sets the Page object
  */
  public setPage(page: Page): void {
    this.page = page;
    this.elementAction = new UIElementActions(page);
  }

  /*
  * Close the current Page object
  */
  public async closePage(): Promise<void> {
    await this.page.close();
  }

  /*
  * Returns the instance of UIElements actions
  * @param selector
  * @param description
  */
  public element(selector: string, description?: string): UIElementActions {
    return this.elementAction.setElement(selector, description);
  }

  /**
   * Navigate to specified URL
   * @param URL
   */
  public async goto(URL: string): Promise<void> {
    await this.page.goto(URL, {timeout: CommonConstants.WAIT, waitUntil: "load"});
  }

  /**
   * Navigate to previous URL
   */
  public async goBack(): Promise<void> {
    await this.page.goBack({ timeout: CommonConstants.WAIT, waitUntil: "load" });
  }

  /**
   * Navigate to next URL
   */
  public async goForward(): Promise<void> {
    await this.page.goForward({ timeout: CommonConstants.WAIT, waitUntil: "load" });
  }

  /**
   * Page Refresh
   */
  public async pageRefresh(): Promise<void> {
    await this.page.reload({ timeout: CommonConstants.WAIT, waitUntil: "load" });
  }

  /**
   * Press a key on web page
   * @param key
   */
  public async keyPress(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Waits for the passed URL and returns the main resource response.
   */
  public async waitForURL(URL: string): Promise<void> {
    await this.page.waitForURL(URL);
  }

  /**
   * Returns when the required load state has been reached.
   */
  public async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState("load", { timeout: CommonConstants.WAIT });
  }

  /**
   * Returns when the required dom content is in loaded state.
   */
  public async waitForDomContentLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded", { timeout: CommonConstants.WAIT });
  }

  /**
   * Gets the handle of the new window
   * @param selector
   * @param description
   */
  public async switchToNewWindow(selector: string, description: string): Promise<Page> {
    let [newPage] = [this.page];
    [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      await this.elementAction.setElement(selector, description).click(),
    ]);
    await this.waitForDomContentLoaded();
    return newPage;
  }

  /**
   * Pauses script execution for live debugging session
   * @returns Promise<void>
   */
  public async pause(): Promise<void> {
    await this.page.pause();
  }
}
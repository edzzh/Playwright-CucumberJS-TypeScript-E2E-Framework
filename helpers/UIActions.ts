import { Page } from "@playwright/test";
import UIElementActions from "./UIElementActions";
import CommonConstants from "../config/CommonConstants";
import InputFieldActions from './InputFieldActions';
import CheckBoxActions from './CheckBoxActions';
import DropDownActions from './DropDownActions';
import AlertActions from './AlertActions';

export default class UIActions {
  private elementAction: UIElementActions;
  private inputFieldActions: InputFieldActions;
  private checkBoxActions: CheckBoxActions;
  private dropDownActions: DropDownActions;
  private alertActions: AlertActions;
  
  constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
    this.inputFieldActions = new InputFieldActions(page);
    this.checkBoxActions = new CheckBoxActions();
    this.dropDownActions = new DropDownActions();
    this.alertActions = new AlertActions(page);
  }

  // ------------------------------ Page Actions -------------------------------------
  
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
    this.inputFieldActions = new InputFieldActions(page);
    this.alertActions = new AlertActions(page);
  }

  /*
  * Close the current Page object
  */
  public async closePage(): Promise<void> {
    await this.page.close();
  }

  // ------------------------------ Navigation Instances ------------------------------

  /*
  * Returns the instance of UIElements actions
  * @param selector
  * @param description
  */
  public element(selector: string, description?: string): UIElementActions {
    return this.elementAction.setElement(selector, description);
  }

  /*
  * Returns the instance of InputField actions
  * @param selector
  * @param description
  * @returns InputFieldActions
  */
  public inputField(selector: string, description?: string): InputFieldActions {
    return this.inputFieldActions.setInputField(selector, description);
  }

  /*
  * Returns the instance of DropDown actions
  * @param selector
  * @param description
  * @returns DropDownActions
  */
  public dropdown(selector: string, description: string): DropDownActions {
    return this.dropDownActions.setLocator(
      this.elementAction.setElement(selector, description).getLocator(), description);
  }

  /*
  * Returns the instance of CheckBox actions
  * @param selector
  * @param description
  * @returns CheckBoxActions
  */
  public checkbox(selector: string, description: string): CheckBoxActions {
    return this.checkBoxActions.setLocator(
      this.elementAction.setElement(selector, description).getLocator(), description);
  }

  /*
  * Returns the instance of Alert actions
  * @returns AlertActions
  */
  public alert(): AlertActions {
    return this.alertActions;
  }

  // ------------------------------ UI Navigation Methods ------------------------------

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

  private async handleAlert(selector: string, description: string, message: Promise<string>): Promise<string> {
    await this.elementAction.setElement(selector, description).click();
    return message;
  }

  /**
   * Clicks the an element, accepts the alert and returns the alert message
   * @param selector  selector of the element
   * @param description description of element
   * @returns alert message
   */
  public async acceptAlertOnElementClick(selector: string, description: string): Promise<string> {
    const message = this.alert().accept();
    return this.handleAlert(selector, description, message);
  }

  /**
   * Clicks the an element, dismisses the alert and returns the alert message
   * @param selector  selector of the element
   * @param description description of element
   * @returns alert message
   */
  public async dismissAlertOnElementClick(selector: string, description: string): Promise<string> {
    const message = this.alert().dismiss();
    return this.handleAlert(selector, description, message);
  }

  /**
   * Clicks the an element, accepts the alert prompt and returns the alert message
   * @param selector  selector of the element
   * @param description description of element
   * @param promptText A text to enter in prompt.
   * @returns alert message
   */
  public async acceptPromptOnElementClick(selector: string, description: string, promptText: string): Promise<string> {
    const message = this.alert().accept(promptText);
    return this.handleAlert(selector, description, message);
  }

  /**
   * Downloads the file and returns the downloaded file name
   * @param selector element that results in file download
   * @returns downloaded file name
   */
  public async downloadFile(selector: string): Promise<string> {
    let fileName: string;
    const [download] = await Promise.all([
      this.page.waitForEvent('download', { timeout: CommonConstants.WAIT }),
      await this.page.locator(selector).click({ modifiers: ["Alt"] }),
    ]);
    fileName = download.suggestedFilename();
    const filePath = `${CommonConstants.DOWNLOAD_PATH}${fileName}`;
    await download.saveAs(filePath);
    await download.delete();
    return fileName;
  }

  /**
   * Pause the execution in seconds
   * @param sec
   */
  public async pauseInSecs(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }
}
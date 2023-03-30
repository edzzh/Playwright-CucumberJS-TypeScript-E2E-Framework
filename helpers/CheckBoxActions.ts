import { Locator } from "@playwright/test";
import CommonConstants from "../config/CommonConstants";

export default class CheckBoxActions {
  private locator: Locator;
  private description: string;

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns CheckBoxActions
   */
  public setLocator(locator: Locator, description: string): CheckBoxActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * Checks the checkbox or the radio button
   * @returns Promise<CheckBoxActions>
   */
  public async check(): Promise<CheckBoxActions> {
    await this.locator.check();
    return this;
  }

  /**
   * Unchecks the checkbox or the radio button
   * @returns Promise<CheckBoxActions>
   */
  public async uncheck(): Promise<CheckBoxActions> {
    await this.locator.uncheck();
    return this;
  }

  /**
   * Returns the status of the checkbox
   * @returns Promise<boolean>
   */
  public async isChecked(): Promise<boolean> {
    const element = this.locator;
    await element.waitFor({ state: "visible", timeout: CommonConstants.WAIT });
    return await this.locator.isChecked();
  }
}
